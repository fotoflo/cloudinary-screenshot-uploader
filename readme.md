# CLOUDINARY SCREENSHOT UPLOADER

Simple tool for mac to 
 - monitor a folder for screenshots,
 - upload to cloudinary
 - send the link to your clipboard

how to use:
1. create a [cloudinary account](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/yqdxmbz83uyohiz4ebig?t=default) (use my link and i'll get credits)
2. create a screenshots folder somewhere
4. set your default file location
   1. Open the Keyboard control panel -> shortcuts -> screenshots
   2. Set the Screenshot and Recording Options shortcut
   3. Run it once and select the `save to` option
5. Move the .env-example file to .env
6. Fill in the variables from cloudinary and your recording options
7. Run the node script

# to do: 
figure out how to get the node script to run at startup and take the envirenment variables by some UI