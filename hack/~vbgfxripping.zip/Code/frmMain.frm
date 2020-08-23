VERSION 5.00
Begin VB.Form frmMain 
   BorderStyle     =   3  'Fixed Dialog
   Caption         =   "GFX Extractor Example"
   ClientHeight    =   2940
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   4470
   Icon            =   "frmMain.frx":0000
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   2940
   ScaleWidth      =   4470
   StartUpPosition =   2  'CenterScreen
   Begin VB.CommandButton cmd2BPP 
      Caption         =   "&Extract Graphics 2BPP"
      Height          =   375
      Left            =   2520
      TabIndex        =   4
      Top             =   720
      Width           =   1815
   End
   Begin VB.CommandButton cmdExtract1BPP 
      Caption         =   "&Extract Graphics 1BPP"
      Height          =   375
      Left            =   2520
      TabIndex        =   3
      Top             =   240
      Width           =   1815
   End
   Begin VB.CheckBox chkGrid 
      Caption         =   "Show/Hide Gridlines"
      Height          =   255
      Left            =   120
      TabIndex        =   2
      Top             =   2520
      Value           =   1  'Checked
      Width           =   1815
   End
   Begin VB.Frame Frame1 
      Caption         =   "Tile"
      Height          =   2295
      Left            =   120
      TabIndex        =   0
      Top             =   120
      Width           =   2175
      Begin VB.PictureBox picBuffer 
         AutoRedraw      =   -1  'True
         BackColor       =   &H00000000&
         BorderStyle     =   0  'None
         Height          =   1920
         Left            =   120
         ScaleHeight     =   128
         ScaleMode       =   3  'Pixel
         ScaleWidth      =   128
         TabIndex        =   1
         Top             =   240
         Width           =   1920
         Begin VB.Line hLine 
            BorderColor     =   &H00FFFFFF&
            Index           =   0
            X1              =   0
            X2              =   136
            Y1              =   16
            Y2              =   16
         End
         Begin VB.Line vLine 
            BorderColor     =   &H00FFFFFF&
            Index           =   0
            X1              =   16
            X2              =   16
            Y1              =   0
            Y2              =   136
         End
      End
   End
   Begin VB.Label Label2 
      Alignment       =   2  'Center
      BackColor       =   &H00800000&
      Caption         =   "The_Fake_God"
      BeginProperty Font 
         Name            =   "Fixedsys"
         Size            =   9
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H000080FF&
      Height          =   255
      Left            =   2520
      TabIndex        =   6
      Top             =   2520
      Width           =   1815
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "Graphics Exctrator Example by: "
      Height          =   390
      Left            =   2520
      TabIndex        =   5
      Top             =   2040
      Width           =   1770
      WordWrap        =   -1  'True
   End
End
Attribute VB_Name = "frmMain"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub chkGrid_Click()
 Gridlines chkGrid.Value
End Sub

Private Sub cmd2BPP_Click()
 GetTile
 PaintTile picBuffer, 1
End Sub

Private Sub cmdExtract1BPP_Click()
 GetTile
 PaintTile picBuffer, 0
End Sub

Private Sub Form_Load()
 ' GRIDLINES
 ' Load the other lines
 For i = 1 To 6
  Load hLine(i)
       hLine(i).Y1 = hLine(i - 1).Y1 + 16
       hLine(i).Y2 = hLine(i - 1).Y2 + 16
       hLine(i).Visible = True
  Load vLine(i)
       vLine(i).X1 = vLine(i - 1).X1 + 16
       vLine(i).X2 = vLine(i - 1).X2 + 16
       vLine(i).Visible = True
 Next i
 
 ' PALLETTES
 ' MPallette
 MPallette.Color1 = RGB(51, 0, 134)
 MPallette.Color2 = RGB(191, 115, 0)
 
 ' Pallette 2BPP
 Pallette2BPP.Color1 = RGB(51, 0, 134)
 Pallette2BPP.Color2 = RGB(191, 115, 0)
 Pallette2BPP.Color3 = RGB(0, 207, 255)
 Pallette2BPP.Color4 = RGB(239, 235, 180)
End Sub
