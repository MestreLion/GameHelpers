VERSION 5.00
Object = "{F9043C88-F6F2-101A-A3C9-08002B2F49FB}#1.2#0"; "COMDLG32.OCX"
Begin VB.Form frmMain 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Editor Example"
   ClientHeight    =   2865
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   2490
   Icon            =   "frmMain.frx":0000
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   ScaleHeight     =   2865
   ScaleWidth      =   2490
   StartUpPosition =   2  'CenterScreen
   Begin VB.CommandButton cmdSave 
      Caption         =   "&Save"
      Height          =   375
      Left            =   1440
      TabIndex        =   7
      Top             =   1800
      Width           =   855
   End
   Begin VB.CommandButton cmdLoad 
      Caption         =   "&Load"
      Height          =   375
      Left            =   120
      TabIndex        =   0
      Top             =   1800
      Width           =   1095
   End
   Begin MSComDlg.CommonDialog dlgMain 
      Left            =   1800
      Top             =   1680
      _ExtentX        =   847
      _ExtentY        =   847
      _Version        =   393216
      CancelError     =   -1  'True
      Filter          =   "Zsnes Save States (*.zs*)|*.zs*"
   End
   Begin VB.TextBox txtLevel 
      Height          =   285
      Left            =   840
      TabIndex        =   6
      Top             =   1200
      Width           =   1455
   End
   Begin VB.TextBox txtHp 
      Height          =   285
      Left            =   840
      TabIndex        =   5
      Top             =   720
      Width           =   1455
   End
   Begin VB.TextBox txtMoney 
      Height          =   285
      Left            =   840
      TabIndex        =   4
      Top             =   240
      Width           =   1455
   End
   Begin VB.Label Label2 
      Caption         =   "Test with Tales of Phantasia (use Dejap's Patch)"
      Height          =   375
      Left            =   120
      TabIndex        =   8
      Top             =   2280
      Width           =   2175
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "Level:"
      Height          =   195
      Index           =   2
      Left            =   120
      TabIndex        =   3
      Top             =   1200
      Width           =   435
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "Hp:"
      Height          =   195
      Index           =   1
      Left            =   120
      TabIndex        =   2
      Top             =   720
      Width           =   255
   End
   Begin VB.Label Label1 
      AutoSize        =   -1  'True
      Caption         =   "Money:"
      Height          =   195
      Index           =   0
      Left            =   120
      TabIndex        =   1
      Top             =   240
      Width           =   525
   End
End
Attribute VB_Name = "frmMain"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim Money As Long
Dim HP As Integer
Dim Level As Byte

Private Sub cmdLoad_Click()
' Prevent the CancelError
On Local Error Resume Next

 ' Show the File Dialog
 dlgMain.ShowOpen

 ' If the user pressed ok then...
 If Err.Number = 0 Then

 ' Open the File
 Open dlgMain.FileName For Binary As #1

  ' Get the Money
  Get #1, 8390 + 1, Money
  txtMoney.Text = Money

  ' Get the HP
  Get #1, 30435 + 1, HP
  txtHp.Text = HP

  ' Get the Level
  Get #1, 30443 + 1, Level
  txtLevel.Text = Level

  ' Close the file
  Close #1
 End If
End Sub

Private Sub cmdSave_Click()
 ' Open the selected file
 Open dlgMain.FileName For Binary As #1
 
 ' "Put" the Money,  use CLng()
 Put #1, 8390 + 1, CLng(Val(txtMoney))
 
 ' "Put" the Hp
 Put #1, 30435 + 1, CInt(Val(txtHp))
 
 ' "Put" the level
 Put #1, 30443 + 1, CByte(Val(txtLevel))
 
 ' Confirmation Message
 MsgBox "Saved!", vbExclamation, "Saved!"
 
 ' Close the File
 Close #1
End Sub
