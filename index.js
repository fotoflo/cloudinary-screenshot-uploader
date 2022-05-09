require('dotenv').config()

const config = {
  homeDir: process.env.CLOUDINARY_HOME_DIR,
  cloudinary: { 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  }
}

const fs = require('fs-extra')
const chokidar = require('chokidar')

const cloudinary = require('cloudinary');
cloudinary.config(config.cloudinary);

const notifier = require('node-notifier');


// ensure the directory exists
fs.ensureDirSync(config.homeDir);

// Initialize watcher.
const watcher = chokidar.watch(config.homeDir, {
  ignored: /.+(?<!\.png)$/gm, // ignore non png
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('add', path => newFileHandler(path))

const newFileHandler = path => {
  console.log( `Uploading ${path}`)

  cloudinaryOptions = {
    public_id: path.split("/")
        .pop() // get the end of the path
        .replace(/ /g, "-") // replace spaces with -
        .slice(0, -4) // remove extra .png
  }

  cloudinary.v2.uploader.upload(path, cloudinaryOptions, uploadCompleteHandler);
}

const uploadCompleteHandler = (err, result) => {
  if(err){
    console.log("Error: ", err)
    return
  }

  console.log(`Uploaded to ${result.secure_url}`)
  notifier.notify(`Upload complete ${result.secure_url}`);
  copyToClipboard(result.secure_url)
}

//copy to clipboard
const copyToClipboard = (data) => {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}