# Generate CMA Learning Platform icon (.ico)
Add-Type -AssemblyName System.Drawing

$sizes = @(256, 128, 64, 48, 32, 16)
$bitmaps = @()

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'HighQuality'
    $g.TextRenderingHint = 'AntiAlias'

    # Background: rounded rect
    $r = [Math]::Floor($size * 0.1875)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($size, $size)),
        [System.Drawing.Color]::FromArgb(0x1a, 0x3a, 0x6b),
        [System.Drawing.Color]::FromArgb(0x0f, 0x25, 0x57)
    )
    $g.FillEllipse($brush, 0, 0, $size - 1, $size - 1)

    # Text: CMA
    $fontSize = [Math]::Floor($size * 0.28)
    $cmaFont = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold)
    $cmaBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = 'Center'
    $sf.LineAlignment = 'Center'
    $g.DrawString('CMA', $cmaFont, $cmaBrush, ($size / 2), ($size * 0.42), $sf)

    # Text: PART 1
    if ($size -ge 48) {
        $subSize = [Math]::Floor($size * 0.10)
        $subFont = New-Object System.Drawing.Font('Segoe UI', $subSize, [System.Drawing.FontStyle]::Bold)
        $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(0x93, 0xc5, 0xfd))
        $g.DrawString('PART 1', $subFont, $subBrush, ($size / 2), ($size * 0.64), $sf)
    }

    $g.Dispose()
    $bitmaps += $bmp
}

# Save as .ico
$iconPath = Join-Path $PSScriptRoot 'icon.ico'
$fs = [System.IO.File]::OpenWrite($iconPath)
$writer = New-Object System.IO.BinaryWriter($fs)

# ICO header
$writer.Write([UInt16]0)      # reserved
$writer.Write([UInt16]1)      # ICO type
$writer.Write([UInt16]$sizes.Count)  # image count

# Write image data and capture offsets
$imageData = @()
$offset = 6 + (16 * $sizes.Count)
foreach ($i in 0..($sizes.Count - 1)) {
    $size = $sizes[$i]
    $bmp = $bitmaps[$i]
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $ms.ToArray()
    $ms.Close()
    $imageData += $bytes

    # Directory entry (256 is stored as 0 in ICO format)
    $sz = if ($size -ge 256) { 0 } else { $size }
    $writer.Write([Byte]$sz)
    $writer.Write([Byte]$sz)
    $writer.Write([Byte]0)      # color palette
    $writer.Write([Byte]0)      # reserved
    $writer.Write([UInt16]1)    # color planes
    $writer.Write([UInt16]32)   # bits per pixel
    $writer.Write([UInt32]$bytes.Length)
    $writer.Write([UInt32]$offset)
    $offset += $bytes.Length
}

foreach ($bytes in $imageData) {
    $writer.Write($bytes)
}

$writer.Close()
$fs.Close()

# Cleanup
foreach ($bmp in $bitmaps) { $bmp.Dispose() }

Write-Output "Icon created: $iconPath ($([Math]::Round((Get-Item $iconPath).Length / 1024)) KB)"
