#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Artist = require('./models/artist.js')
const Genre = require('./models/genre.js')
const Song = require('./models/song.js')

const artists = []
const genres = []
const songs = []

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0]

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createArtists();
    await createGenres();
    await createSongs();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}


async function artistsCreate(index, name) {
    const artist = new Artist({ name: name })
    await artist.save()
    artists[index] = artist
    console.log(`Added artist: ${artist}`)
}

async function genreCreate(index, name) {
    const genre = new Genre({ name: name })
    await genre.save()
    genres[index] = genre
    console.log(`Added genre: ${genre}`)
}

async function songCreate(index, name, artist, genre) {
    const songDetail = {
        name: name,
        artist: artist,
        genre: genre
    };
    const song = new Song(songDetail)
    await song.save()
    songs[index] = song
    console.log(`Added song ${song}`)
}

async function createGenres() {
    console.log("Adding genres")
    await Promise.all([
        genreCreate(0, "Pop"),
        genreCreate(1, "Rock"),
        genreCreate(2, "Hip-hop"),
        genreCreate(3, "R&B"),
        genreCreate(4, "Country"),
        genreCreate(5, "Electronic"),
        genreCreate(6, "Jazz"),
        genreCreate(7, "Dance"),
        genreCreate(8, "Indie"),
        genreCreate(9, "Rap")
    ])
}

async function createArtists() {
    console.log("Adding artists")
    await Promise.all([
        artistsCreate(0, "Sir Chloe"),
        artistsCreate(1, "The Strokes"),
        artistsCreate(2, "TV Girl"),
        artistsCreate(3, "Lemon Demon"),
        artistsCreate(4, "Foo  Fighters"),
        artistsCreate(5, "Lil Yachty"),
        artistsCreate(6, "Vida"),
        artistsCreate(7, "MF DOOM"),
        artistsCreate(8, "The Districts"),
        artistsCreate(9, "Peach Pit"),
        artistsCreate(10, "Steve Lacy"),
        artistsCreate(11, "Mac Miller"),
    ])
}

async function createSongs() {
    console.log('Adding Songs')
    await Promise.all([
        songCreate(0, "Sedona", artists[0], genres[8]),
        songCreate(0, "Threat of Joy", artists[1], genres[8]),
        songCreate(0, "Better in the Dark", artists[2], genres[8]),
        songCreate(0, "Fine", artists[3], genres[8]),
        songCreate(0, "Everlong", artists[4], genres[1]),
        songCreate(0, "drive ME crazy!", artists[5], genres[3]),
        songCreate(0, "Something Inside", artists[6], genres[8]),
        songCreate(0, "Rapp Snitch Knishes", artists[7], genres[9]),
        songCreate(0, "Long Distance", artists[8], genres[8]),
        songCreate(0, "Look Out!", artists[9], genres[8]),
        songCreate(0, "Helmet", artists[10], genres[0]),
        songCreate(0, "Love Lost", artists[11], genres[9]),
    ])
}
