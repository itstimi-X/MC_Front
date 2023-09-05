# base-image
FROM openjdk@sha256:9a37f2c649301b955c2fd31fb180070404689cacba0f77404dd20afb1d7b8d84
LABEL authors="timi"

# 변수 설정(빌드파일의 경로)
ARG JAR_FILE=build/libs/*.jar

# 빌드파일을 컨테이너에 복사
COPY ${JAR_FILE} front-app.jar

# jar파일 실행
ENTRYPOINT ["java", "-jar", "/front-app.jar"]

# SSL 설정
COPY keystore.p12 /app/ssl/keystore.p12
