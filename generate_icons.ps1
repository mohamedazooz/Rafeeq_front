Add-Type -AssemblyName System.Drawing;

function Process-RafeeqLogo {
    param(
        [string]$SourceFile,
        [string]$TargetDir
    )

    $srcBmp = [System.Drawing.Bitmap]::FromFile($SourceFile);
    $w = $srcBmp.Width;
    $h = $srcBmp.Height;

    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h);
    $srcData = $srcBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
    $bytes = $srcData.Stride * $h;
    $srcBytes = New-Object byte[] $bytes;
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBytes, 0, $bytes);
    $srcBmp.UnlockBits($srcData);
    $srcBmp.Dispose();

    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0;
    $cleanBytes = New-Object byte[] $bytes;

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $i = ($y * $srcData.Stride) + ($x * 4);
            $b = [int]$srcBytes[$i];
            $g = [int]$srcBytes[$i+1];
            $r = [int]$srcBytes[$i+2];

            $maxVal = [Math]::Max($r, [Math]::Max($g, $b));
            $minVal = [Math]::Min($r, [Math]::Min($g, $b));
            $diff = $maxVal - $minVal;

            # Check if checkerboard background (neutral grey/white)
            if ($diff -le 14 -and $minVal -ge 195) {
                $cleanBytes[$i] = 0;
                $cleanBytes[$i+1] = 0;
                $cleanBytes[$i+2] = 0;
                $cleanBytes[$i+3] = 0;
            } elseif ($diff -le 22 -and $minVal -ge 215) {
                $alpha = [Math]::Min(255, [Math]::Max(0, [int](($diff - 14) / 8.0 * 255)));
                $cleanBytes[$i] = $b;
                $cleanBytes[$i+1] = $g;
                $cleanBytes[$i+2] = $r;
                $cleanBytes[$i+3] = [byte]$alpha;
                if ($alpha -gt 30) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            } else {
                $cleanBytes[$i] = $b;
                $cleanBytes[$i+1] = $g;
                $cleanBytes[$i+2] = $r;
                $cleanBytes[$i+3] = 255;
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    $cleanBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
    $outData = $cleanBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
    [System.Runtime.InteropServices.Marshal]::Copy($cleanBytes, 0, $outData.Scan0, $bytes);
    $cleanBmp.UnlockBits($outData);

    Write-Output "Detected Logo Content Bounds: X=[$minX, $maxX], Y=[$minY, $maxY] (Width: $($maxX - $minX + 1), Height: $($maxY - $minY + 1))";

    # Content width and height
    $contentW = $maxX - $minX + 1;
    $contentH = $maxY - $minY + 1;
    $srcContentRect = New-Object System.Drawing.Rectangle($minX, $minY, $contentW, $contentH);

    # Create Master 1024x1024 Square Centered Emblem
    $masterSize = 1024;
    $padding = 40; # 40px padding for balanced breathing room
    $targetSize = $masterSize - (2 * $padding);

    $scale = [Math]::Min($targetSize / $contentW, $targetSize / $contentH);
    $destW = [int]($contentW * $scale);
    $destH = [int]($contentH * $scale);
    $destX = [int](($masterSize - $destW) / 2);
    $destY = [int](($masterSize - $destH) / 2);

    $masterBmp = New-Object System.Drawing.Bitmap($masterSize, $masterSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
    $g = [System.Drawing.Graphics]::FromImage($masterBmp);
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality;
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality;
    $g.Clear([System.Drawing.Color]::Transparent);

    $destRect = New-Object System.Drawing.Rectangle($destX, $destY, $destW, $destH);
    $g.DrawImage($cleanBmp, $destRect, $srcContentRect, [System.Drawing.GraphicsUnit]::Pixel);
    $g.Dispose();
    $cleanBmp.Dispose();

    # Function to create resized versions
    function Save-Resized($size, $filename) {
        $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
        $gr = [System.Drawing.Graphics]::FromImage($bmp);
        $gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
        $gr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality;
        $gr.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
        $gr.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality;
        $gr.Clear([System.Drawing.Color]::Transparent);
        $gr.DrawImage($masterBmp, 0, 0, $size, $size);
        $gr.Dispose();

        $destPath = Join-Path $TargetDir $filename;
        $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png);
        $bmp.Dispose();
        Write-Output "Generated: $destPath ($size x $size)";
    }

    Save-Resized 1024 "logo-emblem.png";
    Save-Resized 512 "icon-512.png";
    Save-Resized 512 "icon.png";
    Save-Resized 192 "icon-192.png";
    Save-Resized 180 "apple-touch-icon.png";
    Save-Resized 180 "apple-icon.png";
    Save-Resized 96 "icon-96.png";
    Save-Resized 64 "icon-64.png";
    Save-Resized 48 "icon-48.png";
    Save-Resized 32 "icon-32.png";
    Save-Resized 16 "icon-16.png";

    # Create multi-resolution ICO file
    $icoPath = Join-Path $TargetDir "favicon.ico";
    $sizes = @(16, 32, 48);
    $pngBytesList = @();

    foreach ($s in $sizes) {
        $bmp = New-Object System.Drawing.Bitmap($s, $s, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb);
        $gr = [System.Drawing.Graphics]::FromImage($bmp);
        $gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;
        $gr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality;
        $gr.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality;
        $gr.Clear([System.Drawing.Color]::Transparent);
        $gr.DrawImage($masterBmp, 0, 0, $s, $s);
        $gr.Dispose();

        $ms = New-Object System.IO.MemoryStream;
        $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png);
        $bmp.Dispose();
        $pngBytesList += ,$ms.ToArray();
        $ms.Dispose();
    }

    $fs = [System.IO.File]::Create($icoPath);
    $bw = New-Object System.IO.BinaryWriter($fs);

    # ICONDIR header
    $bw.Write([uint16]0); # Reserved
    $bw.Write([uint16]1); # Type: 1 = ICO
    $bw.Write([uint16]$sizes.Count); # Number of images

    $offset = 6 + (16 * $sizes.Count);

    for ($k = 0; $k -lt $sizes.Count; $k++) {
        $s = $sizes[$k];
        $pngData = $pngBytesList[$k];
        
        $dim = [byte]$s;
        if ($s -ge 256) { $dim = 0 }

        $bw.Write($dim); # Width
        $bw.Write($dim); # Height
        $bw.Write([byte]0); # Color count
        $bw.Write([byte]0); # Reserved
        $bw.Write([uint16]1); # Color planes
        $bw.Write([uint16]32); # Bits per pixel
        $bw.Write([uint32]$pngData.Length); # Size of image data
        $bw.Write([uint32]$offset); # Offset of image data
        $offset += $pngData.Length;
    }

    for ($k = 0; $k -lt $sizes.Count; $k++) {
        $pngData = $pngBytesList[$k];
        $bw.Write($pngData);
    }

    $bw.Flush();
    $bw.Close();
    $fs.Close();
    Write-Output "Generated multi-resolution ICO: $icoPath";

    $masterBmp.Dispose();
}

$source = 'C:\Users\3aZzO0OzZ\.gemini\antigravity-ide\brain\1506d450-8b74-4d41-b320-03eeafe6f7ae\.user_uploaded\media_1787125472473.jpg';
$dest = 'd:\RAFEEQ\Rafeeq_front\public';
Process-RafeeqLogo -SourceFile $source -TargetDir $dest
