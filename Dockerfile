# 1. OpenJDK 17 기반 이미지 사용 (빌드 용)
FROM openjdk:17-jdk-slim AS build

# 2. 작업 디렉토리
WORKDIR /poe2-proj

# 3. 코드 복사
COPY springboot/database/. .

# 4. 프로젝트 빌드
RUN gradle build --no-daemon

# 5. OpenJDK 17 기반 이미지 사용 (jar 구동)
FROM openjdk:17-jdk-slim

# 작업 디렉토리
WORKDIR /poe2

COPY --from=build /d4-proj/build/libs/*.jar app.jar

# 포트 명시
EXPOSE 6070

# node 실행
ENTRYPOINT ["java", "-jar", "app.jar"]