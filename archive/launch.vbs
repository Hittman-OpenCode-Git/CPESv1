' CMA Learning Platform — One-Click Launcher
' Double-click this file to start studying.
' Opens in a clean application window — no browser tabs or URL bar.

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the directory where this script lives
appDir = objFSO.GetParentFolderName(WScript.ScriptFullName)
htmlPath = appDir & "\index_updated.html"

' Try Edge app mode first (clean window, no browser chrome)
On Error Resume Next
objShell.Run "msedge.exe --app=""" & htmlPath & """ --window-size=1400,900", 1, False
If Err.Number = 0 Then WScript.Quit

' Fallback: open in default browser
On Error Resume Next
objShell.Run """" & htmlPath & """", 1, False
