# The base image
FROM dockerhub.m.com/nginx:v1.2

# Install register
RUN pip install -i xxx --trusted-host xxx register>=17.0.3

# Add nginx config, replace the default one
RUN rm /etc/nginx/sites-available/default
ADD NGINX /etc/nginx/sites-available/default

# Copy source code, NOTE, the directory 'src' itself will be not copied be it's content
ADD dist /var/www/default/

# NOTE, this port should be equals to the port in nginx config
ENV PAAS_SERVICE_PORTS=80

# ADD start script
ADD start.sh /

ENTRYPOINT bash /start.sh
