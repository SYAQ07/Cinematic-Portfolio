# Unduh aset portfolio dari panduan DuingzForge dan buat ZIP.
# Simpan file ini di folder utama Cinematic-Portfolio, lalu jalankan dengan PowerShell.

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$AssetRoot = Join-Path $ProjectRoot "Asset"
$ZipPath = Join-Path $ProjectRoot "Asset-paket.zip"
$BaseUrl = "https://www.duingzforge.site/kit/portfolio/Asset/"

$files = @(
    "cv/Renando_Editor_VFX.pdf.pdf",
    "img/SERTIFIKAT/dalang.jpg",
    "img/SERTIFIKAT/juara2.jpg",
    "img/SERTIFIKAT/mindplace2.jpg",
    "img/SERTIFIKAT/peringkat2.jpg",
    "img/SERTIFIKAT/shortmovie.jpeg",
    "img/SERTIFIKAT/videolabs.jpg",
    "img/favicon.svg",
    "img/gwe.jpeg",
    "img/renando-portrait.png",
    "svg/CUI.svg",
    "svg/EBS.svg",
    "svg/EG.svg",
    "svg/PF.svg",
    "svg/SB.svg",
    "svg/SD.svg",
    "svg/UE.svg",
    "svg/ae.svg",
    "svg/ai.svg",
    "svg/am.svg",
    "svg/bl.svg",
    "svg/cc.svg",
    "svg/cv.svg",
    "svg/cx.svg",
    "svg/ibis.svg",
    "svg/is.svg",
    "svg/km.svg",
    "svg/lr.svg",
    "svg/lrc.svg",
    "svg/pa.svg",
    "svg/pl.svg",
    "svg/pr.svg",
    "svg/ps.svg",
    "svg/vn.svg",
    "svg/vs.svg",
    "svg/vsco.svg",
    "svg/brand/Extrajoss.png",
    "svg/brand/Netflix.svg",
    "svg/brand/SevenDragon.png",
    "svg/brand/Whatsin.png",
    "svg/brand/diskominfo.png",
    "svg/brand/dpmptsp.png",
    "svg/brand/hara.png",
    "svg/brand/jeta.png",
    "svg/brand/logogatsu.png",
    "svg/brand/magma.png",
    "svg/brand/mbc.png",
    "svg/brand/pemda.png",
    "svg/brand/raincreation.png",
    "svg/brand/seven.png",
    "svg/brand/sma1seragen.png",
    "svg/brand/sma2indramayu.png",
    "svg/brand/unwir.png",
    "svg/brand/vianos.png"
)

# Paksa TLS 1.2 untuk kompatibilitas Windows PowerShell lama.
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
} catch {}

New-Item -ItemType Directory -Force -Path $AssetRoot | Out-Null

$success = 0
$skipped = 0
$failed = New-Object System.Collections.Generic.List[string]

Write-Host "`nMengunduh aset dari sumber panduan..." -ForegroundColor Cyan

foreach ($relativePath in $files) {
    $destination = Join-Path $AssetRoot ($relativePath -replace '/', [IO.Path]::DirectorySeparatorChar)
    $directory = Split-Path -Parent $destination
    New-Item -ItemType Directory -Force -Path $directory | Out-Null

    if (Test-Path -LiteralPath $destination) {
        Write-Host "[LEWATI] Sudah ada: $relativePath" -ForegroundColor DarkGray
        $skipped++
        continue
    }

    $url = $BaseUrl + $relativePath
    try {
        Invoke-WebRequest -Uri $url -OutFile $destination -UseBasicParsing -TimeoutSec 30
        if ((Test-Path -LiteralPath $destination) -and ((Get-Item -LiteralPath $destination).Length -gt 0)) {
            Write-Host "[OK] $relativePath" -ForegroundColor Green
            $success++
        } else {
            throw "File hasil unduhan kosong."
        }
    } catch {
        if (Test-Path -LiteralPath $destination) {
            Remove-Item -LiteralPath $destination -Force
        }
        Write-Host "[GAGAL] $relativePath -- $($_.Exception.Message)" -ForegroundColor Red
        $failed.Add($relativePath)
    }
}

Write-Host "`nRingkasan: berhasil $success | dilewati $skipped | gagal $($failed.Count)" -ForegroundColor Cyan

if (Test-Path -LiteralPath $ZipPath) {
    Remove-Item -LiteralPath $ZipPath -Force
}
try {
    Compress-Archive -Path $AssetRoot -DestinationPath $ZipPath -Force
    Write-Host "`nZIP dibuat: $ZipPath" -ForegroundColor Green
} catch {
    Write-Host "`nGagal membuat ZIP: $($_.Exception.Message)" -ForegroundColor Red
}

if ($failed.Count -gt 0) {
    Write-Host "`nFile yang gagal diunduh:" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host " - $_" }
    Write-Host "`nFile gagal tidak diganti dengan file contoh atau placeholder." -ForegroundColor Yellow
}

Write-Host "`nCatatan: aset Renando hanya untuk preview lokal. Ganti seluruh foto, CV, sertifikat, logo/identitas, dan data kontak contoh sebelum portfolio dipublikasikan." -ForegroundColor Yellow
Read-Host "`nTekan Enter untuk menutup"
