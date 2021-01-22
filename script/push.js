let { resolve } = require('path')
let baseDir = resolve(__dirname, '../')
let git = require('simple-git')({baseDir}) // https://github.com/steveukx/git-js

// 推送代码
~function () {
    git.branch((err, { current }) => {
        // github
        git.push('origin', current, err => {
            if (err) {
                return reject(new Error('推送失败:' + err))
            }
        })
        // gitee
        git.push('gitee', current, err => {
            if (err) {
                return reject(new Error('推送失败:' + err))
            }
        })
    });
}()
