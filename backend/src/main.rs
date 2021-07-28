use actix_web::{get, post, HttpServer, App, Responder, HttpResponse, HttpRequest};
use actix_web::http::{HeaderValue, StatusCode};
use actix_web::web::{Path, Bytes, Buf};
use ms_converter::ms;
use rand::Rng;
use rand::distributions::Alphanumeric;
use std::env::var;
use std::fs;
use std::fs::File;
use std::io::{Result, Write};
use std::thread;
use std::time::{Duration, Instant};
use std::process::Command;

#[actix_web::main]
async fn main() -> Result<()> {
    let ip: String = var("ARC_IP").unwrap_or(String::from("127.0.0.1"));
    let port: i32 = var("ARC_PORT").unwrap_or(String::from("5000")).parse().unwrap_or(5000);

    fs::create_dir_all("data")?;
    thread::spawn(|| {
        let wait = Duration::from_millis(ms("30d").unwrap() as u64);

        loop {
            let start = Instant::now();

            Command::new("find").arg("data")
                .arg("-type").arg("f").arg("-mtime")
                .arg("+30").arg("-delete")
                .output().unwrap();
            println!("Deleted files older than 30 days!");

            let runtime = start.elapsed();
            if let Some(remaining) = wait.checked_sub(runtime) {
                thread::sleep(remaining)
            }
        }
    });

    println!("Started web server on: {}:{}", ip, port);
    HttpServer::new(|| {
        App::new()
            .service(new)
            .service(raw)
    }).bind(format!("{}:{}", ip, port))?.run().await
}

#[post("/new")]
async fn new(request: HttpRequest, bytes: Bytes) -> impl Responder {
    if !(request.headers().get("Content-Type").unwrap().to_str().unwrap().eq("application/x-arc-profiler")
        && request.headers().get("User-Agent").unwrap_or(&HeaderValue::from_str("unknown").unwrap()).eq("arc-profiler")) {
        return HttpResponse::build(StatusCode::BAD_REQUEST)
            .body("{ \"error\": true, \"message\": \"Invalid content type and user agent.\" }")
    }
    let key: String = rand::thread_rng().sample_iter(&Alphanumeric).take(10).map(char::from).collect();

    let path = format!("data/{}", key);
    let mut file = File::create(&path).unwrap();
    file.write_all(bytes.bytes()).expect("failed to write data to file");
    println!("Created new file: {}", path);

    HttpResponse::Ok().body(format!("{{ \"error\": false, \"message\": \"{}\" }}", key))
}

#[get("/raw/{key}")]
async fn raw(_: HttpRequest, Path(key): Path<String>) -> impl Responder {
    if !fs::metadata(format!("data/{}", key)).is_ok() {
        return HttpResponse::build(StatusCode::NOT_FOUND).content_type("application/json")
            .body("{ \"error\": true, \"message\": \"The requested profile wasn't found on our servers.\" }");
    }
    HttpResponse::Ok().content_type("application/x-arc-profiler").body(fs::read(format!("data/{}", key)).unwrap())
}
