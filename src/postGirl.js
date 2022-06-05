const pool = require('./pool.config').pool;
const queryGirl = require("./query/girl").queryGirl;

// Inserts a girl into the DB. Returns the girls id if succesfull, else a 0.
const insertGirl = async (client, girl) => {
    const queryString = `INSERT INTO girl(
        name, anime, url, width, height, is_nsfw
        ) VALUES (
            '${girl.name}', '${girl.anime}', '${girl.url}', ${girl.width}, ${girl.height}, ${girl.is_nsfw}
        )`;
    await client.query(queryString);

    // Query the id of the girl
    const id = await client.query(`SELECT id FROM girl WHERE url = $1`, [girl.url]);
    if (id.rows.length > 0) {
        return id.rows[0].id;
    } else {
        return 0;
    }
}

// Inserts a tag into the DB. Returns the tag id if succesfull, else a 0.
const insertTag = async (client, tag) => {
    // First, does the Tag already exist?
    const tagQuery = await client.query(`SELECT id FROM tag WHERE name = $1`, [tag]);
    if (tagQuery.rows.length > 0) {
        return tagQuery.rows[0].id;
    } else {
        const queryString = `INSERT INTO tag(
            name
            ) VALUES ('${tag}')`;
        await client.query(queryString);
        // Should have already been created, so query again.
        return insertTag(client, tag);
    }
}

// Inserts a property into the DB. Returns the property id if succesfull, else a 0.
const insertProperty = async (client, property, girlId) => {
    const queryString = `INSERT INTO property(
        hair_color, hair_length, breasts, eye_color, girl_id
        ) VALUES (
            '${property.hair_color}', '${property.hair_length}', '${property.breasts}', '${property.eye_color}', ${girlId}
        )`;
    await client.query(queryString);
    // Query the id of the property
    let id = await client.query("SELECT id FROM property WHERE girl_id = $1", [girlId]);
    if (id.rows.length > 0) {
        return id.rows[0].id;
    } else {
        return 0;
    }
}

exports.postGirl = async (req, res) => {
    try {
        const client = await pool.connect();
        const girl = req.body.girl;
        const properties = req.body.properties;
        const tags = req.body.tags;
        // Check if girl already exists
        if (await queryGirl(girl.url)) {
            res.status(200).send({ result: "Girl already exists" });
            return;
        }

        let girlId = await insertGirl(client, girl);
        let propertyId = 0;
        if (girlId > 0) {
            // We successfully uploaded a girl, continue
            propertyId = await insertProperty(client, properties, girlId);
            // Loop through tags and insert one by one.
            for (let i = 0; i < tags.length; i++) {
                let tag = tags[i];
                let tagId = await insertTag(client, tag);
                if (tagId > 0) {
                    // Insert into tag to girl table
                    await client.query(`INSERT INTO tag_to_girl (tag_id, girl_id) VALUES (${tagId} ,${girlId})`);
                }
            }
        }
        res.status(200).json({
            girlId: girlId,
            propertyId: propertyId
        });
        client.release();
    } catch (err) {
        console.log(err);
        res.status(500).send({ 'Server error': err });
    }
}