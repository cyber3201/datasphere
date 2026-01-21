const { Client } = require('pg');

// Initialize database connection
const getClient = () => {
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
};

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    const client = getClient();

    try {
        const body = JSON.parse(event.body);
        const { action, data } = body;

        await client.connect();

        // SIGNUP: Create new user
        if (action === 'signup') {
            const { name, email, password, school, age, source, city } = data;
            const query = `
        INSERT INTO Users (name, email, password, school, age, source, city, avatar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING user_id, name, email, school, city, age, source, avatar, created_at;
      `;
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=1E3A8A&color=fff`;
            const values = [name, email, password, school, age, source, city, avatar];
            const res = await client.query(query, values);

            return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.rows[0]),
            };
        }

        // LOGIN: Authenticate user
        if (action === 'login') {
            const { email, password } = data;
            const query = 'SELECT user_id, name, email, school, city, age, source, avatar, headline, bio FROM Users WHERE email = $1 AND password = $2';
            const res = await client.query(query, [email, password]);

            if (res.rows.length > 0) {
                // Also fetch user's experience and education
                const userId = res.rows[0].user_id;

                const expQuery = 'SELECT * FROM User_Experience WHERE user_id = $1 ORDER BY created_at DESC';
                const expRes = await client.query(expQuery, [userId]);

                const eduQuery = 'SELECT * FROM User_Education WHERE user_id = $1 ORDER BY created_at DESC';
                const eduRes = await client.query(eduQuery, [userId]);

                const user = {
                    ...res.rows[0],
                    experience: expRes.rows,
                    education: eduRes.rows
                };

                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                };
            } else {
                return {
                    statusCode: 401,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: 'Invalid credentials' }),
                };
            }
        }

        // UPDATE USER: Update user profile
        if (action === 'updateUser') {
            const { user_id, name, headline, city, bio } = data;
            const query = `
        UPDATE Users 
        SET name = COALESCE($2, name), 
            headline = COALESCE($3, headline), 
            city = COALESCE($4, city), 
            bio = COALESCE($5, bio),
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
        RETURNING user_id, name, email, school, city, age, source, avatar, headline, bio;
      `;
            const res = await client.query(query, [user_id, name, headline, city, bio]);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.rows[0]),
            };
        }

        // SAVE PROGRESS: Track lesson completion
        if (action === 'saveProgress') {
            const { user_id, lesson_id, completed } = data;
            const query = `
        INSERT INTO User_Progress (user_id, lesson_id, completed, completed_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id, lesson_id)
        DO UPDATE SET completed = $3, completed_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;
            const res = await client.query(query, [user_id, lesson_id, completed]);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.rows[0]),
            };
        }

        // GET PROGRESS: Fetch user's progress
        if (action === 'getProgress') {
            const { user_id } = data;
            const query = 'SELECT lesson_id, completed, completed_at FROM User_Progress WHERE user_id = $1 AND completed = TRUE';
            const res = await client.query(query, [user_id]);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completedLessons: res.rows.map(r => r.lesson_id) }),
            };
        }

        // ADD EXPERIENCE: Add work experience
        if (action === 'addExperience') {
            const { user_id, role, company, year, description } = data;
            const query = `
        INSERT INTO User_Experience (user_id, role, company, year, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
            const res = await client.query(query, [user_id, role, company, year, description]);

            return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.rows[0]),
            };
        }

        // DELETE EXPERIENCE
        if (action === 'deleteExperience') {
            const { experience_id } = data;
            const query = 'DELETE FROM User_Experience WHERE experience_id = $1';
            await client.query(query, [experience_id]);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true }),
            };
        }

        // ADD EDUCATION
        if (action === 'addEducation') {
            const { user_id, school, degree, year } = data;
            const query = `
        INSERT INTO User_Education (user_id, school, degree, year)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
            const res = await client.query(query, [user_id, school, degree, year]);

            return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.rows[0]),
            };
        }

        // DELETE EDUCATION
        if (action === 'deleteEducation') {
            const { education_id } = data;
            const query = 'DELETE FROM User_Education WHERE education_id = $1';
            await client.query(query, [education_id]);

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true }),
            };
        }

        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Invalid action' })
        };

    } catch (err) {
        console.error('Database error:', err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Database error', details: err.message }),
        };
    } finally {
        await client.end();
    }
};
