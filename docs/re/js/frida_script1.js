
// 主入口函数
function getPath() {
    // 获取主应用的 bundle 路径
    const mainBundlePath = ObjC.classes.NSBundle.mainBundle().bundlePath().toString();
    console.log("主应用 Bundle 路径:", mainBundlePath);

    // 获取主应用的可执行文件路径
    const executablePath = ObjC.classes.NSBundle.mainBundle().executablePath().toString();
    console.log("可执行文件路径:", executablePath);
}

// 调用主入口函数
getPath();

