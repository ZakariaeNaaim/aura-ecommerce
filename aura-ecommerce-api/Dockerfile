
FROM maven:3.8.5-openjdk-17 AS build

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim

COPY --from=build /target/aura-ecommerce-api-1.0.0.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "aura-ecommerce-api-1.0.0.jar"]
