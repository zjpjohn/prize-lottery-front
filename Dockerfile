FROM nginx
#维护者
MAINTAINER zhoujiaqi

#设置编码时区环境变量
ENV LANG C.UTF-8
ENV LAC_ALL C.UTF-8
ENV TZ=Asia/Shanghai

#复制打包好的页面到镜像中
COPY dist/ /usr/share/nginx/html

#复制default.conf覆盖镜像中的default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
