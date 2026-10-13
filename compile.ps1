# Build CV.pdf (and optional lettre.pdf). Works even if MiKTeX is not on PATH yet.
$ErrorActionPreference = "Stop"
$MiktexCandidates = @(
    "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64"
    "${env:ProgramFiles}\MiKTeX\miktex\bin\x64"
)
$MiktexBin = $MiktexCandidates | Where-Object { Test-Path (Join-Path $_ "pdflatex.exe") } | Select-Object -First 1
if (-not $MiktexBin) {
    Write-Error "pdflatex not found. Install MiKTeX: winget install MiKTeX.MiKTeX"
}
$env:Path = "$MiktexBin;$env:Path"
$env:MIKTEX_ENABLE_INSTALLER = "t"
Set-Location $PSScriptRoot

$targets = if ($args.Count -gt 0) { $args } else { @("CV.tex") }
foreach ($tex in $targets) {
    if (-not (Test-Path $tex)) { Write-Error "Missing file: $tex" }
    Write-Host "==> $tex" -ForegroundColor Cyan
    & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Warning "pdflatex pass 1 exited with $LASTEXITCODE (check .log)" }
    & pdflatex.exe -interaction=nonstopmode $tex | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Warning "pdflatex pass 2 exited with $LASTEXITCODE (check .log)" }
    $pdf = [System.IO.Path]::ChangeExtension($tex, ".pdf")
    if (Test-Path $pdf) { Write-Host "Wrote $pdf ($((Get-Item $pdf).Length) bytes)" -ForegroundColor Green }
    else { Write-Error "Build failed: $pdf not created" }
}
