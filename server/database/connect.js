// dependencies
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/mhs',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Model
const Schema = mongoose.Schema;

const Mahasiswa = new Schema({
    NIM: {
        type: String,
        unique: true,
        required: true
    },
    Nama: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('mahasiswaData', Mahasiswa);