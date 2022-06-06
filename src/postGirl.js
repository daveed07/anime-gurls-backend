const { checkSpecificJsonForUndefined, checkJsonForUndefined } = require('./utils/checkJsonForUndefined');
const sql = require('./utils/sql');
const { sendServerStatus, sendError } = require('./utils/status');
const queryGirl = require("./query/girl").queryGirl;

// Inserts a girl into the DB. Returns the girls id if succesfull, else a 0.
const insertGirl = async (girl) => {
    // Check if url, width, height, is_nsfw are undefined
    let n = checkSpecificJsonForUndefined(girl, ["url", "width", "height", "is_nsfw"]);
    if (n!== null) {
        console.log("Undefined somewhere " + n.key + ": " + n.value);
        return 0;
    }

    const queryString = `INSERT INTO girl(
        name, anime, url, width, height, is_nsfw
        ) VALUES (
            $1, $2, $3, $4, $5, $6
        )`;
    const name = girl.name !== undefined ? girl.name.toLowerCase() : null;
    const anime = girl.anime !== undefined ? girl.anime.toLowerCase() : null;

    await sql.query(queryString, [name, anime, girl.url, girl.width, girl.height, girl.is_nsfw]);

    // Query the id of the girl
    const id = await sql.query(`SELECT id FROM girl WHERE url = $1`, [girl.url]);

    if (sql.checkQuery(id)) {
        return id.rows[0].id;
    } else {
        return 0;
    }
}

// Inserts a tag into the DB. Returns the tag id if succesfull, else a 0.
const insertTag = async (tag) => {
    // Is tag undefined?
    if (tag === undefined) {
        return 0;
    }

    // First, does the Tag already exist?
    const tagQuery = await sql.query(`SELECT id FROM tag WHERE name = $1`, [tag]);
    if (sql.checkQuery(tagQuery)) {
        return tagQuery.rows[0].id;
    } else {
        const queryString = `INSERT INTO tag(
            name
            ) VALUES ($1)`;
        await sql.query(queryString, [tag.toLowerCase()]);
        // Should have already been created, so query again.
        return insertTag(tag);
    }
}

// Inserts a property into the DB. Returns the property id if succesfull, else a 0.
const insertProperty = async (property, girlId) => {
    // Does property have undefined values?
    if (checkJsonForUndefined(property) !== null) {
        return 0;
    }

    const queryString = `INSERT INTO property(
        hair_color, hair_length, breasts, eye_color, girl_id
        ) VALUES (
            $1, $2, $3, $4, $5
        )`;
    await sql.query(
        queryString, [
            property.hair_color.toLowerCase(), 
            property.hair_length.toLowerCase(), 
            property.breasts.toLowerCase(), 
            property.eye_color.toLowerCase(),
            girlId
        ]
    );
    // Query the id of the property
    let id = await sql.query("SELECT id FROM property WHERE girl_id = $1", [girlId]);
    if (sql.checkQuery(id)) {
        return id.rows[0].id;
    } else {
        return 0;
    }
}

exports.postGirl = async (req, res) => {
    try {
        const girl = req.body;
        const properties = girl.properties;
        const tags = girl.tags;
        // Check if girl already exists
        if (await queryGirl(girl.url)) {
            sendServerStatus(res, girl, 200);
            return;
        }

        let girlId = await insertGirl(girl);
        let propertyId = 0;
        if (girlId > 0) {
            // We successfully uploaded a girl, continue
            propertyId = await insertProperty(properties, girlId);
            // Loop through tags and insert one by one.
            for (let i = 0; i < tags.length; i++) {
                let tag = tags[i];
                let tagId = await insertTag(tag);
                if (tagId > 0) {
                    // Insert into tag to girl table
                    await sql.query(`INSERT INTO tag_to_girl (tag_id, girl_id) VALUES (${tagId} ,${girlId})`);
                }
            }
        }
        sendServerStatus(res, {girl_id: girlId, property_id: propertyId}, 200);
    } catch (err) {
        sendError(err, res);
    }
}