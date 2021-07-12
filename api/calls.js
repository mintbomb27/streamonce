//var mongoose = require('mongoose');
const express = require('express')
const { request } = require('express');
const uniqid = require('uniqid')
require('dotenv').config()
const router = express.Router()

static var rooms = {
    'room-name': 'admin-id',
}

router.get('/createRoom/:clientid', (req,res) => {
    var client = req.params.clientid
    var room = uniqid('room-')
    rooms[room] = client;
    res.status(200).send(room);
})