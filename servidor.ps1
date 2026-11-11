# Servidor local para revisar el sitio antes de publicarlo.
# No instala nada y no sale a internet: solo sirve esta carpeta en tu propio computador.
# Lo arranca «VER EL SITIO.bat». Para detenerlo, cierra la ventana.

$ErrorActionPreference = "Stop"
$raiz = (Split-Path -Parent $MyInvocation.MyCommand.Definition).TrimEnd([IO.Path]::DirectorySeparatorChar)

$tipos = @{
  ".html" = "text/html; charset=utf-8";  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8";   ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json";          ".svg"  = "image/svg+xml"
  ".png"  = "image/png";                 ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg";                ".gif"  = "image/gif"
  ".webp" = "image/webp";                ".ico"  = "image/x-icon"
  ".pdf"  = "application/pdf";           ".txt"  = "text/plain; charset=utf-8"
  ".woff2"= "font/woff2";                ".woff" = "font/woff"
  ".mp3"  = "audio/mpeg";                ".mp4"  = "video/mp4"
  ".zip"  = "application/zip"
}

# busca un puerto libre, por si ya tienes algo corriendo en el 8080
$puerto = 0
foreach ($p in 8080, 8081, 8082, 8090, 8800, 9090) {
  $o = New-Object System.Net.HttpListener
  $o.Prefixes.Add("http://localhost:$p/")
  try { $o.Start(); $oyente = $o; $puerto = $p; break }
  catch { try { $o.Close() } catch {} }
}

if ($puerto -eq 0) {
  Write-Host ""
  Write-Host "  No pude abrir ningun puerto local." -ForegroundColor Red
  Write-Host "  Abre el archivo index.html con doble clic: el sitio tambien funciona asi."
  Write-Host ""
  Read-Host "  Pulsa Enter para cerrar"
  exit 1
}

Write-Host ""
Write-Host "  El sitio esta en:  http://localhost:$puerto" -ForegroundColor Green
Write-Host "  Para comprobar que no falte nada:  http://localhost:$puerto/revision.html"
Write-Host "  Deja esta ventana abierta mientras lo revisas."
Write-Host "  Para detenerlo, cierra esta ventana."
Write-Host ""

Start-Process "http://localhost:$puerto/"

while ($oyente.IsListening) {
  try {
    $ctx = $oyente.GetContext()
    $pedido = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($pedido.EndsWith("/")) { $pedido += "index.html" }

    $relativa = $pedido.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar
    $archivo = [IO.Path]::GetFullPath((Join-Path $raiz $relativa))

    # nunca servir nada de fuera de esta carpeta
    if (-not $archivo.StartsWith($raiz + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -and $archivo -ne $raiz) {
      $ctx.Response.StatusCode = 403; $ctx.Response.Close(); continue
    }

    if (-not (Test-Path -LiteralPath $archivo -PathType Leaf)) {
      $cuatro = Join-Path $raiz "404.html"
      if (Test-Path -LiteralPath $cuatro) {
        $archivo = $cuatro; $ctx.Response.StatusCode = 404
      } else {
        $ctx.Response.StatusCode = 404; $ctx.Response.Close(); continue
      }
    }

    $ext = [IO.Path]::GetExtension($archivo).ToLower()
    $ctx.Response.ContentType = $(if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { "application/octet-stream" })
    $ctx.Response.Headers.Add("Cache-Control", "no-store")

    $bytes = [IO.File]::ReadAllBytes($archivo)
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.OutputStream.Close()
  } catch {
    try { $ctx.Response.Close() } catch {}
  }
}
