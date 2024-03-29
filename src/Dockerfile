ARG NODE_TAG=latest
FROM node:${NODE_TAG}
LABEL Maintainer="Feng Yu<abcfy2@163.com>"

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ARG JDK_VERSION=8

RUN apt update && \
    apt install -y gnupg wget apt-transport-https zip && \
    apt-key adv \
    --keyserver hkp://keyserver.ubuntu.com:80 \
    --recv-keys 0xB1998361219BD9C9 && \
    wget https://cdn.azul.com/zulu/bin/zulu-repo_1.0.0-3_all.deb && \
    apt install -y ./zulu-repo_1.0.0-3_all.deb && \
    apt update && \
    apt install -y zulu${JDK_VERSION}-jdk-headless && \
    rm -fr /var/cache/apt/* /var/lib/apt/lists/*

# download and install Gradle
# https://services.gradle.org/distributions/
ARG GRADLE_VERSION=4.1
ARG GRADLE_DIST=bin
ARG GRADLE_WRAPPER_GENERATOR_VER=7.3.2
RUN cd /opt && \
    wget https://services.gradle.org/distributions/gradle-${GRADLE_WRAPPER_GENERATOR_VER}-bin.zip && \
    unzip -q gradle*.zip && \
    mkdir -p "gradle-${GRADLE_VERSION}-${GRADLE_DIST}-wrapper" && \
    cd "gradle-${GRADLE_VERSION}-${GRADLE_DIST}-wrapper" && \
    touch build.gradle && \
    /opt/gradle-${GRADLE_WRAPPER_GENERATOR_VER}/bin/gradle wrapper --no-daemon --gradle-version "${GRADLE_VERSION}" --distribution-type "${GRADLE_DIST}" && \
    ln -s "/opt/gradle-${GRADLE_VERSION}-${GRADLE_DIST}-wrapper/gradlew" /usr/local/bin/gradle && \
    rm -fr /opt/gradle*.zip "/opt/gradle-${GRADLE_WRAPPER_GENERATOR_VER}" "gradle-${GRADLE_VERSION}-${GRADLE_DIST}-wrapper/build.gradle"

# download and install Android SDK
# https://developer.android.google.cn/studio/#command-tools
ARG ANDROID_SDK_VERSION=7583922
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV ANDROID_HOME ${ANDROID_SDK_ROOT}
RUN mkdir -p ${ANDROID_HOME} && cd ${ANDROID_HOME} && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_VERSION}_latest.zip && \
    unzip -q commandlinetools-linux*.zip && \
    rm commandlinetools-linux*.zip && \
    ln -s "${ANDROID_HOME}/cmdline-tools/bin/"* /usr/local/bin
RUN yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses && rm -fr ~/.android
RUN npm install cordova -g && \
    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" "build-tools;30.0.3"
RUN chown -R node: /opt/*
USER node
