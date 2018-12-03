const fs = require('fs');
const promisePipe = require('promisepipe');
const crypto = require('crypto');
const helper = require('./../helpers/helper');


module.exports = {    
    upload: async (req, folder, fileName) => {
        fileName = fileName ? fileName + '.jpg' : crypto.randomBytes(16).toString('hex') + '.jpg';
        const tmpPath = req.file.path;
        let baseDir = `${process.cwd()}/public/uploads`;
        let fileDir = folder ? `${baseDir}/${folder}` : baseDir;
        const uploadPath = fileDir + '/' + fileName;

        helper.createDirectoriesRecursively(fileDir);

        try {
            await promisePipe(
                fs.createReadStream(tmpPath),
                fs.createWriteStream(uploadPath)
            );

            fs.unlink(tmpPath, (err) => {
                if (err) {
                    throw err;
                }
            });
            return `${process.env.API_URL}/uploads/${folder}/${fileName}`;
        }
        catch (err) {
            throw err;
        }
    },
    remove: (filePath) => {
        if(filePath.includes(process.env.API_URL)) {
            filePath = `${process.cwd()}/public/${filePath.replace(`${process.env.API_URL}/`, '')}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return !fs.existsSync(filePath);
            }
        }
        
        return true;
    }
};
