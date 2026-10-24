import Foundation
import Vision
import AppKit

let paths = Array(CommandLine.arguments.dropFirst())
for path in paths {
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("### \(path) (load failed)"); continue
    }
    let req = VNRecognizeTextRequest()
    req.recognitionLanguages = ["zh-Hans", "en-US"]
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = false
    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    try? handler.perform([req])
    print("### \(path)")
    if let obs = req.results {
        for o in obs {
            if let c = o.topCandidates(1).first {
                let b = o.boundingBox
                print(String(format: "[%.3f,%.3f,%.3f,%.3f] %@", b.origin.x, 1.0 - b.origin.y - b.size.height, b.size.width, b.size.height, c.string))
            }
        }
    }
}
