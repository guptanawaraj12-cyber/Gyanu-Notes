$root = Get-Location
$files = Get-ChildItem -Recurse -Filter *.html
$count = 0
$dash = "-"
foreach ($f in $files) {
    $html = Get-Content $f.FullName -Raw
    $orig = $html
    $hasDesc = $html -match '<meta\s+name="description"'
    $hasCanon = $html -match 'rel="canonical"'
    if (-not $hasDesc -or -not $hasCanon) {
        $titleMatch = [regex]::Match($html, '<title[^>]*>(.*?)</title>', 'IgnoreCase,Singleline')
        $label = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { $f.Name }
        $label = $label -replace '\s*\|\s*Gyanu Notes.*$', '' -replace '\s*-\s*Gyanu Notes.*$', '' -replace '\s*[' + [char]0x2014 + '].*$', ''
        if ($label -eq '' -or $label -eq $f.Name) {
            switch ($f.Directory.Name) {
                'class-8' { $label = 'Class 8' }
                'class-9' { $label = 'Class 9' }
                'class-10' { $label = 'Class 10' }
                'class-11' { $label = 'Class 11' }
                'class-12' { $label = 'Class 12' }
                'view' { $label = 'Chapter Viewer' }
                default { $label = 'Gyanu Notes' }
            }
        }
        if ($f.Name -eq '404.html') { $desc = 'Page not found - Gyanu Notes.' }
        elseif ($f.Directory.Name -eq 'view') { $desc = 'View chapter or paper content - Gyanu Notes.' }
        else { $desc = $label + ' - Gyanu Notes.' }
        $canonPath = $f.FullName.Substring($root.Path.Length).TrimStart('\').Replace('\', '/')
        if ($canonPath -eq 'index.html') { $canonPath = $f.Directory.Name + '/' }
        elseif ($canonPath -like '*/index.html') { $canonPath = $canonPath -replace '/index.html$', '/' }
        else { $canonPath = $canonPath + '/' }
        $canonUrl = "https://nawarajgupta.com.np/$canonPath"
        if (-not $hasDesc) {
            $newMeta = '<meta name="description" content="' + $desc + '">`r`n  </head>'
            $html = $html -replace [regex]::Escape('</head>'), $newMeta
        }
        if (-not $hasCanon) {
            $newCanon = '<link rel="canonical" href="' + $canonUrl + '">`r`n  </head>'
            $html = $html -replace [regex]::Escape('</head>'), $newCanon
        }
        if ($html -ne $orig) {
            Set-Content $f.FullName $html -Encoding UTF8
            $count++
            Write-Host ("Updated " + $f.FullName)
        }
    }
}
Write-Host ("=== updated " + $count + " files ===")
