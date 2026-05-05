FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/mypetstore-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENV PORT=8080
CMD ["java", "-jar", "mypetstore-0.0.1-SNAPSHOT.jar"]
