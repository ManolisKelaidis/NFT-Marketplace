const express = require('express');
var cors = require('cors')
const ipfsClient = require('ipfs-http-client');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
// const base64 = require('base64-arraybuffer');

//const ipfs = ipfsClient.create('http://localhost:5001');
const ipfs = ipfsClient.create('https://admin:CiaoCiao8@ipfs.plirio.com');
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', async (req, res) => {
  const file = await ipfs.get('QmWdb5zLy1tC1mcTip1Z9qAdQEjEYpCUS4wRX8MHBu2HJa');
  return res.send(file);
});

app.post('/text', async (req, res) => {
  const data = req.body;
  console.log(data);
  const fileHash = await addText(data);
  return res.send(`https://gateway.ipfs.io/ipfs/${fileHash}`);
});

app.post('/upload', async (req, res) => {
  const file = req.files.file;
  const filename = req.body.fileName;
  const filepath = 'uploadedFiles/' + filename;

  file.mv(filepath, async (err) => {
    const fileHash = await addFile(filename, filepath);
    return res.send(`https://gateway.ipfs.io/ipfs/${fileHash}`);
  });
});

// Takes a base64 string from the api without the data:image/png;base64, prefix and uploads it to ipfs
app.post('/base64', async (req, res) => {
  const base64String = req.body.fileContent;
  const fileName = req.body.fileName;
  const base64stringToArrayBuffer = Buffer.from(base64String, 'base64');

  const image = { path: fileName, content: base64stringToArrayBuffer };

  let fileHash;
  try {
    fileHash = await ipfs.add(image);
    fileHash = fileHash.cid;
  } catch (e) {
    console.error('Could not upload to ipfs: ', e);
    fileHash = 'null';
  }

  return res.send(`https://gateway.ipfs.io/ipfs/${fileHash}`);
});

const addText = async ({ path, content }) => {
  const file = { path: path, content: Buffer.from(content) };
  const filesAdded = await ipfs.add(file);
  return filesAdded.cid.string;
}

const addFile = async (filename, filepath) => {
  const file = fs.readFileSync(filepath);
  const dummy = { path: filename, content: file };
  const fileAdded = await ipfs.add(dummy);
  return fileAdded.cid.string;
}


app.listen(3001, () => {
  console.log('Server running on port 3001');
});


// const ipfsClient = require('ipfs-http-client');

// const addFile = async ({ path, content }) => {
//   const file = { path: path, content: Buffer.from(content) };
//   const filesAdded = await ipfs.add(file);
//   return filesAdded[0].hash;
// }

// (async () => {
//   try {
//     //const client = ipfs.create();
//     const ipfs = ipfsClient('http://localhost:5001');
//     // const source = await ipfs.globSource('~/Downloads/186486294_10160936157238272_3304322547984608108_n.jpeg');
//     // const file = await client.add(source);

//     const data = uint8ArrayFromString('some data')
//     const file = await ipfs.add(data, {
//       mode: 0o600,
//       mtime: {
//         secs: 1000,
//         nsecs: 0
//       }
//     })


//     console.log(file);
//   } catch (e) {
//     console.error( e);
//   }
// })();