const express = require('express');
var cors = require('cors')
const ipfsClient = require('ipfs-http-client');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path=require("path");

const ipfs = ipfsClient.create('https://admin:CiaoCiao8@ipfs.plirio.com');

async function uploadFile(req){
    const filename=req.filename;
    const filepath=path.join(__dirname, "../uploaded_files/", req.url);
    const fileHash=await addFile(filename, filepath);
    return "https://gateway.ipfs.io/ipfs/"+fileHash; 
}

async function uploadText(req){
    const fileHash=await addText(req);
    return {path:"../uploaded_files/"+ req.path, content:"https://gateway.ipfs.io/ipfs/"+fileHash};
}

async function addFile (filename, filepath){
    const file = fs.readFileSync(filepath);
    const dummy = { path: filename, content: file };
    const fileAdded = await ipfs.add(dummy);
    return fileAdded.cid.toString();
}

async function addText(text){

    const content = Buffer.from(text.content);
    const filepath=path.join(__dirname, "../uploaded_files/", text.path);
    fs.writeFileSync(filepath, content);
    const file=fs.readFileSync(filepath);
    const filesAdded = await ipfs.add(file);
    return filesAdded.cid.toString();
}

module.exports={
    uploadFile,
    uploadText
};