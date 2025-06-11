

# 常用git命令

### 更新忽略文件

```
git rm -r --cached
git add .
```

### git命令

```bash
yum -y install git                                  // 安装git
git --version                                       // git版本
git init                                            // 初始化
git config --global user.name "wencong"             // 设置username
git config --global user.email "zhao_new@sina.com"  // 设置邮箱
git remote add origin git地址                        // 添加远程仓库
git config --global credential.helper store         // 输入这个命令后,以后只要在输入一次用户名密码
git config pull.rebase false                        // 合并
git pull origin "master"                            // 拉取
git checkout "master"                               // 切换分支名
git branch -a                                       // 查看所有分支
git branch                                          // 查看当前分支
```
三、git update-index --assume-unchanged [filename]方式忽略

该方式用于忽略对库上已经存在的文件修改。

添加忽略：git update-index --assume-unchanged [filename]

取消忽略：git update-index --no-assume-unchanged [filename]

## 1、 常用的git命令

Git 常用的六个命令是什么？

·“git clone”克隆代码；

·“git log”查看日志；

·“git tag”查看标签；

·“git branch”查看分支；

·“git branch -a”查看远程分支；

·“git pull”拉取。



![1639463859109_git命令大全.png](http://www.itheima.com/images/newslistPIC/1639463859108_git%E5%91%BD%E4%BB%A4%E5%A4%A7%E5%85%A8.png)

## 2、 新建代码

在当前目录新建一个Git代码库

```bash
 git init
```

新建一个目录，将其初始化为Git代码库

```bash
 git init [project-name]
```

下载一个项目和它的整个代码历史

```bash
 git clone [url]
```

## 3、 配置

显示当前的Git配置

```bash
 git config --list
```

编辑Git配置文件

```bash
 git config -e [--global]
```

设置提交代码时的用户信息

```bash
 git config [--global] user.name "[name]"
 git config [--global] user.email "[email address]"
```

## 4、 增加/删除文件

添加指定文件到暂存区

```bash
 git add [file1] [file2] ...
```

添加指定目录到暂存区，包括子目录

```bash
 git add [dir]
```

加当前目录的所有文件到暂存区

```bash
 git add .
```

删除工作区文件，并且将这次删除放入暂存区

```bash
 git rm [file1] [file2] ...
```

停止追踪指定文件，但该文件会保留在工作区

```bash
 git rm --cached [file]
```

改名文件，并且将这个改名放入暂存区

```bash
 git mv [file-original] [file-renamed]
```

## 5、代码提交

提交暂存区到仓库区

```bash
 git commit -m [message]
```

提交暂存区的指定文件到仓库区

```bash
 git commit [file1] [file2] ... -m [message]
```

提交工作区自上次commit之后的变化，直接到仓库区

```bash
 git commit -a 
```

提交时显示所有diff信息

```bash
 git commit -v
```

使用一次新的commit，替代上一次提交

如果代码没有任何新变化，则用来改写上一次commit的提交信息

```bash
 git commit --amend -m [message]
```

重做上一次commit，并包括指定文件的新变化

```bash
 git commit --amend   ...
```

## 6、分支

列出所有本地分支

```bash
 git branch
```

列出所有远程分支

```bash
 git branch -r
```

列出所有本地分支和远程分支

```bash
 git branch -a
```

新建一个分支，但依然停留在当前分支

```bash
 git branch [branch-name]
```

新建一个分支，并切换到该分支

```bash
 git checkout -b [branch]
```

新建一个分支，指向指定commit

```bash
 git branch [branch] [commit]
```

新建一个分支，与指定的远程分支建立追踪关系

```bash
 git branch --track [branch] [remote-branch]
```

切换到指定分支，并更新工作区

```bash
 git checkout [branch-name]
```

建立追踪关系，在现有分支与指定的远程分支之间

```bash
 git branch --set-upstream [branch] [remote-branch]
```

合并指定分支到当前分支

```bash
 git merge [branch]
```

选择一个commit，合并进当前分支

```bash
 git cherry-pick [commit]
```

删除分支

```bash
 git branch -d [branch-name]
```

删除远程分支

```bash
 git push origin --delete 
 git branch -dr
```

## 7、标签

列出所有tag

```bash
 git tag
```

新建一个tag在当前commit

```bash
 git tag [tag]
```

新建一个tag在指定commit

```bash
 git tag [tag] [commit]
```

查看tag信息

```bash
 git show [tag]
```

提交指定tag

```bash
 git push [remote] [tag]
```

提交所有tag

```bash
 git push [remote] --tags
```

新建一个分支，指向某个tag

```bash
 git checkout -b [branch] [tag]
```

## 8 、查看所有信息

显示有变更的文件

```bash
 git status
```

显示当前分支的版本历史

```bash
 git log
```

显示commit历史，以及每次commit发生变更的文件

```bash
 git log --stat
```

显示某个文件的版本历史，包括文件改名

```bash
 git log --follow [file]
 git whatchanged [file]
```

显示指定文件相关的每一次diff

```bash
 git log -p [file]
```

显示指定文件是什么人在什么时间修改过

```bash
 git blame [file]
```

显示暂存区和工作区的差异

```bash
 git diff
```

显示暂存区和上一个commit的差异

```bash
 git diff --cached []
```

显示工作区与当前分支最新commit之间的差异

```bash
 git diff HEAD
```

显示两次提交之间的差异

```bash
 git diff [first-branch]...[second-branch]
```

显示某次提交的元数据和内容变化

```bash
 git show [commit]
```

显示某次提交发生变化的文件

```bash
 git show --name-only [commit]
```

显示某次提交时，某个文件的内容

```bash
 git show [commit]:[filename]
```

显示当前分支的最近几次提交

```bash
 git reflog
```

## 9、 远程同步

下载远程仓库的所有变动

```bash
 git fetch [remote]
```

显示所有远程仓库

```bash
 git remote -v
```

显示某个远程仓库的信息

```bash
 git remote show [remote]
```

增加一个新的远程仓库，并命名

```bash
 git remote add [shortname] [url]
```

取回远程仓库的变化，并与本地分支合并

```bash
 git pull [remote] [branch]
```

上传本地指定分支到远程仓库

```bash
 git push [remote] [branch]
```

强行推送当前分支到远程仓库，即使有冲突

```bash
 git push [remote] --force
```

推送所有分支到远程仓库

```bash
 git push [remote] --all
```

恢复暂存区的指定文件到工作区

```bash
 git checkout [file]
```

恢复某个commit的指定文件到工作区

```bash
 git checkout [commit] [file]
```

恢复上一个commit的所有文件到工作区

```bash
 git checkout .
```

重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

```bash
 git reset [file]
```

重置暂存区与工作区，与上一次commit保持一致

```bash
 git reset --hard
```

重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变

```bash
 git reset [commit]
```

重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致

```bash
 git reset --hard [commit]
```

重置当前HEAD为指定commit，但保持暂存区和工作区不变

```bash
 git reset --keep [commit]
```

新建一个commit，用来撤销指定commit，后者的所有变化都将被前者抵消，并且应用到当前分支

```bash
 git revert [commit]
```

## 10、其他

生成一个可供发布的压缩包

```bash
 git archive
```

备份当前工作区的内容

```bash
 git stash
```

从Git栈中读取最近一次保存的内容，恢复工作区的相关内容

```bash
 git stash pop
```

显示Git栈内的所有备份

```bash
 git stash list
```

清空Git栈

```bash
 git stash clear
```