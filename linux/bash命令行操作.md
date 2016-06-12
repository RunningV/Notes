1. 获取root权限：
    `sudo -s`
    输入密码
    退出root环境
    `exit || ctrl + d`
2. 更新系统软件：APT操作
    `sodo apt-get update` : 更新系统可用软件
    `sudo apt-cache search filename`： 查找可用更新文件
3. 切换当前路径：
    `cd` 或 `cd ~` : 从任意路径切换到当前用户根目录
    `cd /`: 从任意路径切换到系统根目录
    `cd 相对路径 || 绝对路径`： 切换到指定路径
4. 查看当前完整路径： `pwd`
5. 查看当前目录文件：
    `ls`: 输出当前目录显式文件和文件夹
    `ls -F`
    `ls -l`
    `ls 路径`
6. 查看文件内容：
    `cat [filepath] filename`： 输出全部文件内容
    `cat filename -n`:  添加行号
    `more [filepath] filename`: 分页显示文件内容，并在底部显示文件当前百分比
    `head` 和`tail` 显示文件开头和结尾， 加 `-n` 显示多少行
    `less`: 是比`more`功能更强大的文件内容查看工具
7. 搜索关键字
  `grep keyword filename1 filename2`: 后可跟多个文件名，在这些文件中搜索keyword,可用正则
8. 查找文件; `find`, `locate`
9. 查找程序文件： `whereis firefox`
    `who`, `whoami`, `uname -a`, `uname -r`
10. 查看命令帮助： `man 命令`

/××××××××××××××××××××××××××××××××××/
11.创建文件目录：
    `mkdir dirname1 dirname2`: 可一次在当前目录创建多个文件目录，可加相对路径
    `mkdir -p unexist/unexist1/dirname`: 加`-p` 参数可递归的创建不存在的中间目录
12. 创建空文件： `touch filename1 filename2`: 可一次创建多个空文件
13. 移动文件位置：
    `mv [filepath]filename [filepath]`: 可添加路径，如果目标目录存在同名文件会被覆盖，移动成功无任何提示
    加 `-i` 参数如果发现同名文件会提示输入`y`,`n`是否覆盖或跳过
    加`-b` 参数会将目标目录中同名文件加`～` 后缀，但是并不可见，用`ls` 可打印出来，可以供更改文件名
    `mv filename filename1`: `mv` 命令可以在移动时更改文件名，可用于重命名
14. 复制文件：
  `cp filename pathname/`: 复制文件到指定目录，与`mv`移动不同
  参数`-b`,`-i` 使用与`mv` 相同
  `-r` 可以复制目录，不指定时如果是目录会忽略
15. 删除文件：
  `rm file`: 删除成功不会有提示
  `-i` 参数提示是否删除
  `-f` force强制删除
  `-r` 递归的删除子目录，不加时通常只能删除目录下的文件，想删除目录下所以子文件夹需添加`-r`
  慎用`-rf` `rm`删除的文件在回收站无法找到，很难找到，慎用，慎用，慎用
16.更改文件权限： 
    `chmod 用户组+/-权限`： 用户组：u-文件属主，g-文件属组，o-其他人，a-所有人
    权限： `rwx` -- 读写执行
    权限修改也可用八进制表示，
17. Linux中文件类型：
  | 文件类型 | 符号 |
  | 普通文件 | - |
  | 目录          | d |
  | 符号链接  | l |
  | 符号设备文件 | c |
  | 块设备文件 | h |
  | 本地域套接口 | s |
  | 有名管道 | p |
18. 建立链接：
    `ln -s  [filepath] filename  linkname`: 建立filename的快捷链接
19. 重定向：
    `>`: 输出重定向覆盖
    `>>`: 输出重定向 
    `<`: 输入重定向
    `<<`： 输入重定向
    可结合cat对文件写入操作,如
    `cat  <<  EOF >> filename`: 对filename 文件实施写入操作，输入`EOF` 退出输入
20. 压缩与解压缩：
    `gzip filename`: 压缩文件，对目标文件直接压缩并添加`.gz`后缀，并不会保存源文件
    `gzip -d filename.gz` 或 `gunzip filename.gz`: 解压缩文件
    `-l` 参数可预览压缩效果
    `bzip2`: 是比`gzip`更高效的压缩与解压缩，用法相同
21. 打包文件：
    `gzip`与`bzip2`只用于压缩单个文件，并不能压缩目录，要想压缩多个文件或目录先要打包多个文件
    `tar cvf file.tar  filepath/` : 必须指定打包文件名`file.tar`,
    `-c`: 创建文件归档
    `-v`: 显示执行过程，可去掉
    `-f`: 指定归档文件名
    `-x`: 解归档文件，与 `-c` 相反
    `-z`: 添加`gzip`的压缩或解压缩功能
    `-j`: 添加`bzip2`的压缩或解压缩功能
22. 查看历史命令操作：
    `history`: 查看历史所有操作命令
    `-n` 参数可以指定查看n条