
// const http = require('http');
import http from "http"
import fs from "fs"
import template from "art-template"
// var path = require('path')
import path from "path"
const server = http.createServer();

var timeFormater = function(RFCdate) {
  var millisecond = Date.parse(RFCdate)     // RFC3999Date格式轉毫秒
  var dateObj = new Date(millisecond) 　    // 轉時間物件
  return `${dateObj.toLocaleDateString()} ${dateObj.getHours()}:${dateObj.getMinutes()}`
}

function returnContentType(extFileName) {
  switch(extFileName) {
    case '.html':
      return 'text/html; charset=utf-8'
      break
    case '.js':
      return 'application/x-javascript; charset=utf-8'
      break
    case '.css':
      return 'text/css; charset=utf-8'
      break
    case '.txt':
      return 'text/plain; charset=utf-8'
      break
    case '.jpg':
      return 'image/jpg'
      break
    case '.jpeg':
      return 'image/jpeg'
      break
    case '.png':
      return 'image/png'
      break
    default:
      return 'charset=utf-8'
      break
  }
}

server.on('request', function (req, res) {
    var url = req.url
    var wwwDir = './www'  //預設web根目錄為/www
    var filePath = ''
    url === '/' ? filePath = '/index.html' : filePath = url

    var fullPath = wwwDir + filePath
    fs.access(fullPath, function (err) {
        if (err) {
            // console.log('資源不存在')
            return res.end('404 Not Found.')
        } else {
            // console.log('資源存在')
            // Do 2.
            if (fs.statSync(fullPath).isDirectory()) {
                // console.log('路徑為資料夾')
                // 讀取資料夾
                fs.readdir(fullPath, function (err, dirFiles) {                                     
                    if (err) {
                        return res.end('404 Not Found.')
                    }

                    // 建立一個indexItem物件,檢查該資料夾內是否有名為index.的檔案
                    var indexItem = {}
                    dirFiles.forEach((file) => {
                        if (/index\./.test(file)) {
                            indexItem = {
                                hasIndexFile: true,
                                fileName: file
                            }
                        }
                    })
                    // 若有index檔案，讀取並回傳該檔案
                    if (indexItem.hasIndexFile) {
                        var indexPathLocation = fullPath + '/' + indexItem.fileName
                        fs.readFile(indexPathLocation, 'utf8', function(err, indexFile) {
                            if (err) {
                                return res.end('404 Not Found.')
                            }
                            // console.log('fullPath=' + fullPath)
                            let extFileName = path.extname(indexItem.fileName)
                            // console.log('extFileName=' + extFileName)
                            res.setHeader('Content-type', returnContentType(extFileName))
                            res.end(indexFile)
                            res.end()
                        })     
                    } else {
                        // 讀取模板文件放入目錄資料 
                        // console.log(fullPath)       
                        fs.readFile(wwwDir+'/template.html', 'utf8', function (err, templateFile) {
                        if (err) {
                            return res.end('404 Not Found.')
                        }
                        var filesDetailInfo = dirFiles.map((file) => {
                            // fs.statSync => 取得檔案或資料夾的詳細資料
                            var statSync = fs.statSync(fullPath + '/' + file)
                            var fileDetail = {
                                fileName: file,                             // 檔名
                                size: statSync.size,                        // 檔案大小
                                createTime: timeFormater(statSync.ctime),   // 創建時間
                                mutateTime: timeFormater(statSync.mtime)    // 修改時間

                            }
                            return fileDetail
                        })
                        // 將資料帶入模板
                        var htmlStr = template.render(templateFile.toString(), {
                            files: filesDetailInfo,
                            folderPath: filePath
                        })
                        res.end(htmlStr)

                        })
                    }             
                })
            } else {
                // 路徑為檔案時，回傳該檔案
                // console.log('filePath=' + filePath)
                let extFileName = path.extname(filePath)
                // console.log('extFileName=' + extFileName)
                fs.readFile(fullPath, 'utf8', function (error, data) {
                    if (error) {
                        return res.end('404 Not Found.')
                    }         
                    res.setHeader('Content-type', returnContentType(extFileName))
                    res.write(data)
                    res.end()
                })
            }
        }
    })


})

server.listen(8000, function () {
  console.log('伺服器正在運行...')
});