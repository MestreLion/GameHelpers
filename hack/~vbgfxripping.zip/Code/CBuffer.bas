Attribute VB_Name = "CBuffer"
' An array of 16 bytes
Global Tile(0 To 15) As Byte

' Monochrome Pallette
Public Type MPallette_
 Color1 As Long
 Color2 As Long
End Type

Global MPallette As MPallette_

Public Type Pallette2BPP_
 Color1 As Long
 Color2 As Long
 Color3 As Long
 Color4 As Long
End Type

Global Pallette2BPP As Pallette2BPP_


Public Sub PaintTile(Buffer As PictureBox, mode As Byte)
 ' Local Variables
 Dim curBit As String * 1
 Dim curBit2 As String * 1
 
 ' Position Index
 Dim x As Integer, y As Integer
 
 Select Case mode
  ' MONOCHROME
  Case 0:
   For y = 0 To 7
    For x = 0 To 7
     curBit = Mid(Bin(Tile(y)), x + 1, 1)
     Select Case curBit
      Case "0": Buffer.Line (x * 16, y * 16)-Step(16, 16), MPallette.Color1, BF
      Case "1": Buffer.Line (x * 16, y * 16)-Step(16, 16), MPallette.Color2, BF
     End Select
    Next x
   Next y
   
   ' 2BPP
   Case 1:
    For y = 0 To 7
     For x = 0 To 7
      curBit = Mid(Bin(Tile(y)), x + 1, 1)
      curBit2 = Mid(Bin(Tile(y + 8)), x + 1, 1)
      Select Case (curBit + curBit2)
       Case "00": Buffer.Line (x * 16, y * 16)-Step(16, 16), Pallette2BPP.Color1, BF
       Case "10": Buffer.Line (x * 16, y * 16)-Step(16, 16), Pallette2BPP.Color2, BF
       Case "01": Buffer.Line (x * 16, y * 16)-Step(16, 16), Pallette2BPP.Color3, BF
       Case "11": Buffer.Line (x * 16, y * 16)-Step(16, 16), Pallette2BPP.Color4, BF
      End Select
     Next x
    Next y
 End Select
End Sub

Public Sub GetTile()
 Open App.Path & "\example.gfx" For Binary As #1
  Get #1, , Tile()
 Close #1
End Sub

Public Sub Gridlines(vis As Boolean)
 ' Change the loop in order to the amount of lines in your grid
 For i = 0 To 6
  frmMain.hLine(i).Visible = vis
  frmMain.vLine(i).Visible = vis
 Next i
End Sub

Public Function Bin(ByVal n As Byte) As String
 mDec = n
 s = Trim(CStr(mDec Mod 2))
 i = mDec \ 2
 Do While i <> 0
   s = Trim(CStr(i Mod 2)) & s
   i = i \ 2
 Loop
 
 ' Fix the readout to 8 chars
 Do While Len(s) < 8
   s = "0" & s
 Loop
 Bin = s
End Function
