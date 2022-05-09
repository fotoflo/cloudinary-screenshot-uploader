require('dotenv').config()

const config = {
  homeDir: CLOUDINARY_HOME_DIR,
  cloudinary: { 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  }
}

const fs = require('fs-extra')
const chokidar = require('chokidar')
const cloudinary = require('cloudinary');
const notifier = require('node-notifier');

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}

fs.ensureDirSync(config.homeDir);

cloudinary.config(config.cloudinary);

// Initialize watcher.
const watcher = chokidar.watch(config.homeDir, {
  ignored: /.+(?<!\.png)$/gm, // ignore non png
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('add', path => newFileHandler(path))

const newFileHandler = path => {
  console.log( `uploading ${path}`)
  
  const uploadCompleteHandler = (err, result) => {
    if(err){
      console.log("error", err)
      return
    }

    console.log(`uploaded to ${result.secure_url}`)
    notifier.notify(`upload complete ${result.secure_url}`);
    pbcopy(result.secure_url)
  }

  cloudinary.v2.uploader.upload(path, {
    public_id: path.split("/")
        .pop() // get the end of the path
        .replace(/ /g, "-") // replace spaces with -
        .slice(0, -4) // remove extra .png
  }, uploadCompleteHandler);
}
