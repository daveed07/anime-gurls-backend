const sql = require('../utils/sql');

const queryTag = async (tagId) => {
    let tag = await sql.query("SELECT name FROM tag WHERE id = $1", [tagId]);
    return tag;
}

exports.queryTags = async (girlId) => {
    // Load the tag ids from tag_to_girl
    const tagIds = await sql.query("SELECT tag_id FROM tag_to_girl WHERE girl_id = $1", [girlId]);
    let tags = [];
    if (sql.checkQuery(tagIds)) {
        for (let i = 0; i < tagIds.rowCount; i++) {
            let tagId = tagIds.rows[i].tag_id;
            let tag = await queryTag(tagId);
            // Check we got tag
            if (sql.checkQuery(tag)) {
                tags.push(tag.rows[0].name);
            }
        }
    }

    return tags;
}