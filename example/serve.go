package main

import (
	"log"
	"net/http"
)

// apparently other dev servers have problems sending large files and send mismatching content length
// which causes net::ERR_CONTENT_LENGTH_MISMATCH 
// go on the other hand works just fine, unlike python's simplehttpserver and php -S

func main() {
	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)

	log.Println("Listening on :8888...")
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatal(err)
	}
}