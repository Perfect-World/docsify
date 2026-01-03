**查看所有端口占用**：

```bash
netstat -ano
```

**查看特定端口（如 8080）是否被占用**：

```bash
netstat -ano | findstr :8080
```