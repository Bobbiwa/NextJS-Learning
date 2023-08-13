npm run dev  开发模式
npm run build 构建
npm run start  生产模式【会启动一个以next为核心的web服务】



# SSG  服务端构建

概念：构建的时候生成静态页面

适用：页面信息变化不频繁的，如：新闻，博客。。

# SSR

概念：用户请求的时候生成静态页面 

适用：页面信息变化频繁的

实现：服务端渲染通过getServerSIdeProps函数完成

过程：当用户发起请求时，next执行getServerSIdeProps，拿到数据props传给Page渲染函数进行生成静态页面，最终返回给用户一个【崭新的页面】



附加：getServerSIdeProps还提供了一个context，

```javascript
const {req,res,params,query,rosolvedUrl...} = context   //有点像express框架那个参数
res.setHeader...还是可以响应头
```



# SSG和SSR区别

- 生成静态页面的时机不同，一个是在build构建时，一个是在用户请求时
- 易混淆点：把SSG的getStaticProps中设置fallback：true/blocking，虽然有点像SSR，但它不是，因为SSG在构建静态页面之后，页面就不会再变化了(想象页面时上的那个时间戳)下次再发起相同的请求  next会返回老的页面，如果想让页面有变化，可以在getStaticProps函数reture对象里添加revalidate：number【任意时间】,它可以设置响应头Cache-control:s-maxage=【任意时间】





