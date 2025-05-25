# MyProject_2457 ΚΑΤΣΑΡΟΥ ΜΑΡΙΑ ΑΝΘΗ 2457

 Το project που επελεξα ειναι μια πλατφορμα συνταγων μαγειρικης ,οπου οι χρηστες μπορουν:
 1) να αναζητησουν συνταγες μεσα απο κατηγοριες
 2) να αξιολογησουν συνταγες
 3) να δημιουργησουν την δικη τους συνταγη
 4) να δημιουργησουν το δικο τους εβδομαδιαιο πλανο διατροφης
 5) να υπαρχει προσαρμογη μεριδων και μοναδων μετρησης στις συνταγες
 6) να υπαρχει login και signup με email και κωδικο 

Η εργασια θα γινει σε δυο κομματια, το frontend και backend οπου στο frontend χρησιμοποιω React με Vite και στο backend χρησιμοποιω ASP.NET
 To vite ειναι εργαλειο για αναπτυξη εφαρμογων Javascript , το οποιο ειναι αρκετα γρηγορο και εχει ενσωματωμενη υποστηριξη ESMODULES 

 ΟΔΗΓΙΕΣ ΕΓΚΑΤΑΣΤΑΣΗΣ για frontend 
  Για τη δημιουργια REACT PROJECT ΜΕ VITE ΣΤΟ VS CODE εγραψα την εντολη
  1) npm create vite@latest project-name --template react
  2) npm install
  3)npm install axios@0.24.0
 ( κατεβασα το axios γιατι ειναι μια βιβλιοθήκη για τη διαχείριση HTTP αιτημάτων στον JavaScript και με αυτο το τροπο συνδεεσαι με το backend της εφαρμογής.Χρησιμοποιείται συνήθως για να στείλεις αιτήματα προς API (όπως GET, POST, PUT, DELETE)
  4) εγκαστεστησα το tailwind css αντι για απλα css διοτι περα του οτι ειναι αρκετα διαδεδομενη ειναι πιο ευκολη στη χρηση εφοσον μπορεις να γραψεισ css μεσα στα jsx αρχεια .Eπισης χρησιμοποιουμε τις ετοιμες tailwind κλασεις οπως text-center. Επισης ειναι πιο ευκολο με την tailwind να δημιουργησω το rensosive design εχοντας ετοιμες κλασεις οπως το md:flex . Οι εντολες που εδωσα στο terminal για εγκατασταση ειναι οι εξης npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/cli
npx tailwindcss init -p
5) Εγκατεστησα το Shadcn με την εντολη npx shadcn@latest init, το οποιο ειναι ενα ui component library με βαση την tailwind css που ειναι και απαραιτητη η εγκατασταση της . Mε αυτη τη βιβλιοθηκη μπορω να βοηθησω και να χρησιμοποιησω ετοιμα components οπως buttons forms ,cards τα οποια μπορω να τροποποιησω και να βγει το αποτελεσμα που θελω . Μεχρι στιγμης εχω χρησιμοποιησει 2 components τα cards για τις συνταγες μου στην αρχικη σελιδα και ενα κουμπι που στη συνεχεια θα πηγαινει σε σελιδα με φορμα για να δημιουργησει καποιος τη δικη του συνταγη . οι εντολεσ ειναι npx shadcn@latest add card
npx shadcn@latest add button
    με την εντολη npm install xlsx file-saver για να αποθηκευσει ο χρηστης το εβδομαδιαιο προγραμμα του ως excel arxeio  
 ΟΔΗΓΙΕΣ ΕΓΚΑΤΑΣΤΑΣΗΣ για backend 
 1) Για τη δημιοουργια νεου project πατησα create a new project επειτα asp.net web api εδωσα ονομα και επειτα πατησα create.
 2)  Οι βιβλιοθηκες τις εφτιαξα κανοντασ δεξι κλικ στο MywebCookingApi παταω manage nuget packages και εγκατεστησα το 1)
 3)   identity framework  βοηθαει για την αυθεντικιποιηση χρηστων  ,
 4) )το mvc newton soft json,
 5)  entryframework.tools kai Npqsql.postgreSQL το οποιο ειναι βασικο για να συνδεθω με τη βαση PostgreSQL  η οποια  ειναι σχεσιακη βαση  και λεγεται CookingDatabase και το connection string το παιρνω απο το appsetting.json.
