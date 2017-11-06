Dim Arg, file, params, fso, fullpath, appRef
Set Arg = WScript.Arguments
file = Arg(0)
params = Arg(1)

Set fso = CreateObject("Scripting.FileSystemObject")
fullpath = fso.GetAbsolutePathName(file)
Set appRef = CreateObject( "Photoshop.Application" )

appRef.DoJavaScriptFile fullpath, Array(params)