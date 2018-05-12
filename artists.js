// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library


// Creates a "Chirp" model that matches up with DB


// Syncs with DB
Artist.sync();

// Makes the Arist Model available for other files (will also create a table)
module.exports = Artist;
