# Full pipeline: JSON -> LaTeX -> PDFs -> website build.
#   .\compile.ps1              regenerate both CVs from JSON, build PDFs, copy them
#                              into the site, and build the website into docs/
#   .\compile.ps1 lettre.tex   legacy mode: only compile the given .tex file(s)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# --- Legacy mode: compile specific .tex files only ---
if ($args.Count -gt 0) {
    $MiktexCandidates = @(
        "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64"
        "${env:ProgramFiles}\MiKTeX\miktex\bin\x64"
    )
    $MiktexBin = $MiktexCandidates | Where-Object { Test-Path (Join-Path $_ "pdflatex.exe") } | Select-Object -First 1
    if (-not $MiktexBin) { Write-Error "pdflatex not found. Install MiKTeX: winget install MiKTeX.MiKTeX" }
    $env:Path = "$MiktexBin;$env:Path"
    $env:MIKTEX_ENABLE_INSTALLER = "t"
    foreach ($tex in $args) {
        if (-not (Test-Path $tex)) { Write-Error "Missing file: $tex" }
        Write-Host "==> $tex" -ForegroundColor Cyan
        & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
        & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
        $pdf = [System.IO.Path]::ChangeExtension($tex, ".pdf")
        if (Test-Path $pdf) { Write-Host "Wrote $pdf" -ForegroundColor Green }
        else { Write-Error "Build failed: $pdf not created" }
    }
    exit 0
}

# --- 1. Generate CV.tex / CV_fr.tex from the JSON content files ---
Write-Host "==> Generating LaTeX from JSON" -ForegroundColor Cyan
node generate_tex.js
if ($LASTEXITCODE -ne 0) { Write-Error "generate_tex.js failed" }

# --- 2. Compile both PDFs ---
$MiktexCandidates = @(
    "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64"
    "${env:ProgramFiles}\MiKTeX\miktex\bin\x64"
)
$MiktexBin = $MiktexCandidates | Where-Object { Test-Path (Join-Path $_ "pdflatex.exe") } | Select-Object -First 1
if (-not $MiktexBin) { Write-Error "pdflatex not found. Install MiKTeX: winget install MiKTeX.MiKTeX" }
$env:Path = "$MiktexBin;$env:Path"
$env:MIKTEX_ENABLE_INSTALLER = "t"

foreach ($tex in @("CV.tex", "CV_fr.tex")) {
    Write-Host "==> $tex" -ForegroundColor Cyan
    & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Warning "pdflatex pass 1 exited with $LASTEXITCODE (check .log)" }
    & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Warning "pdflatex pass 2 exited with $LASTEXITCODE (check .log)" }
    $pdf = [System.IO.Path]::ChangeExtension($tex, ".pdf")
    if (Test-Path $pdf) { Write-Host "Wrote $pdf ($((Get-Item $pdf).Length) bytes)" -ForegroundColor Green }
    else { Write-Error "Build failed: $pdf not created" }
}

# --- 3. Move the PDFs into the website's public folder (single copy, no duplicates) ---
Move-Item "CV.pdf"    "portfolio\public\cv-maxime-laroche-en.pdf" -Force
Move-Item "CV_fr.pdf" "portfolio\public\cv-maxime-laroche-fr.pdf" -Force
Write-Host "==> PDFs moved to portfolio\public" -ForegroundColor Green

# --- 4. Build the website into docs/ ---
Write-Host "==> Building website" -ForegroundColor Cyan
Push-Location "$PSScriptRoot\portfolio"
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { Write-Error "Website build failed" }
}
finally {
    Pop-Location
}

Write-Host "Done: CV.pdf, CV_fr.pdf and docs/ are up to date." -ForegroundColor Green
