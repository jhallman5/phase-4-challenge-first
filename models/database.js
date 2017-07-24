const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

const query = (sql, variables) =>
  client.query(sql, variables)
    .then( result => result.rows )
    .catch( error => {
      console.error('query error --->', error)
      throw new Error(error)
    })

const getAlbums = () =>
  query("SELECT * FROM albums", [])


const getAlbumsByID = (albumID) =>
  query("SELECT * FROM albums WHERE id = $1", [albumID])

module.exports = {
  getAlbums,
  getAlbumsByID
}