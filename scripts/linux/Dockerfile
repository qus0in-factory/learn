FROM ubuntu:24.04@sha256:fe81560990fae86dc4743202b2cb4d3df98d0bcf949173cecef15ce1127ef852
ARG PLAYWRIGHT_VERSION=1.56.1
ENV DEBIAN_FRONTEND=noninteractive PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl xz-utils python3 poppler-utils git && \
    rm -rf /var/lib/apt/lists/*
RUN set -eux; \
    case "$(dpkg --print-architecture)" in \
      amd64) A=x64; S=6c172a9ab6718f7b801fb5a7bd486af2ee5e32758086a04b84fcce2aa77095e6 ;; \
      arm64) A=arm64; S=dbabf7a1cbf947e6059ffad2c27b80041db97dea1e553b62afdee7f13fca336e ;; \
      *) echo "unsupported arch" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://nodejs.org/dist/v24.22.1/node-v24.22.1-linux-$A.tar.xz" -o /tmp/node.tar.xz; \
    echo "$S  /tmp/node.tar.xz" | sha256sum -c -; \
    tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1; \
    rm /tmp/node.tar.xz
RUN mkdir -p /pw && cd /pw && npm init -y >/dev/null && \
    npm install --no-audit --no-fund "playwright@$PLAYWRIGHT_VERSION" && \
    ./node_modules/.bin/playwright install --with-deps chromium && \
    rm -rf /pw/node_modules /root/.npm
COPY check-container.sh /usr/local/bin/check-container.sh
WORKDIR /work
