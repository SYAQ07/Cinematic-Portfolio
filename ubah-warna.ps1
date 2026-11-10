
$path = ".\src\styles.css"

if (!(Test-Path $path)) {
    Write-Host "File styles.css tidak ditemukan!" -ForegroundColor Red
    exit
}

$content = Get-Content $path -Raw

# Periksa semua bagian sebelum mengubah file
$checks = @(
    '--red:#1677FF;--red-dark:#0D47A1;',
    ':root{--red:#1677FF;--button-red:#1677FF}',
    '.hero-stats>div>.display{color:var(--red)}.hero-role{color:var(--red)}'
)

foreach ($item in $checks) {
    if (!$content.Contains($item)) {
        Write-Host "Perubahan dibatalkan. Bagian CSS tidak cocok: $item" -ForegroundColor Red
        exit
    }
}

$heroPattern = [regex]::new('\.hero-title\{[^}]*?color:#1677FF;')

if (!$heroPattern.IsMatch($content)) {
    Write-Host "Selector hero-title tidak cocok!" -ForegroundColor Red
    exit
}

# Buat backup
Copy-Item $path "$path.before-red-restore.bak" -Force

# Kembalikan warna merah
$content = $content.Replace(
    '--red:#1677FF;--red-dark:#0D47A1;',
    '--red:#e32b3c;--red-dark:#a6081c;'
)

$content = $heroPattern.Replace($content, {
    param($match)
    $match.Value.Replace('color:#1677FF;', 'color:#bd0c22;')
}, 1)

$content = $content.Replace(
    ':root{--red:#1677FF;--button-red:#1677FF}',
    ':root{--red:#ef4151;--button-red:#ca2032}'
)

$content = $content.Replace(
    '.hero-stats>div>.display{color:var(--red)}.hero-role{color:var(--red)}',
    '.hero-stats>div>.display{color:#ef4151}.hero-role{color:#ef4151}'
)

Set-Content -Path $path -Value $content -NoNewline

Write-Host "Warna merah berhasil dikembalikan!" -ForegroundColor Green
Write-Host "Backup tersimpan sebagai styles.css.before-red-restore.bak"
