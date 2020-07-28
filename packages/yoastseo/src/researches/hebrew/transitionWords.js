/** @module config/transitionWords */

const singleWords = [ "לכן", "משום‎", "בגלל", "מפני", "אחרי", "לפני", "חוץ", "בזכות", "כתוצאה", "הודות", "בשביל", "למרות‎",
	"בשל‎", "ו", "או", "אבל", "אולם", "אך", "אם", "גם", "רק", "אכן", "אלא", "עדיין", "כאשר", "אז", "לכן", "כבר", "לאחר",
	"אפילו", "אף", "כך", "כדי", "על", "עד", "בשנת", "כמו", "שני", "באופן", "במהלך", "במקום", "וכן", "בעיקר", "מאז", " בינתיים",
	"במקום", "תחת", "מתוך", "מול", "כגון", "באמצעות", "מכן", "במשך", "ואף", "ועל", "לעתים", "למרות", "בנוסף", "בעקבות",
	"לפי", "בקרב", "כי", "בשל", "ראשית", "שנית", "תחילה", "לבסוף", "הבא", "ברם", "ואילו", "להפך", "כנגד", "מנגד", "אמנם",
	"אדרבא", "לחילופין", "בייחוד", "במיוחד", "ודאי", "ואפילו", "לו", "אילו", "לולא", "אלמלא", "אילולא", "מאחורי", "בקרבת", "כאן",
	"שם", "כן", "למעט", "בלבד", "מלבד", "כמו", "שוב", "כלומר", "דהיינו", "לאמור", "כאמור", "כידוע", "כש", "אחר-כך", "כעבור",
	"לאחרונה", "בטרם", "עכשיו", "עתה", "מלכתחילה", "למען", "פן", "לבל", "שמא" ];
const multipleWords = [ "כתוצאה מכך", "כתוצאה מ", "בעקבות ה", "בעקבות זאת", "לעומת זאת", "אלא אם כן", "בזמן ש", "מתי ש",
	"אף על פי ש", "אף על פי", "חוץ מ", "אחרי ש", "לפני ש", "בעוד ש", "בגלל ה", "הודות ל", "בניגוד ל", "מפני ש", "אלא ש",
	"קודם כל", "והחשוב ביותר", "לפני כן", "לאחר מכן", "אחר כך", "שלב ראשון", "בניגוד לכך", "ראוי לציין", "יש להדגיש", "ללא ספק",
	"קל וחומר", "אין ספק ש", "לא כל שכן", "בתנאי ש", "בדומה ל", "כשם ש", "כפי ש", "כך גם", "יחסית ל", "בהשוואה ל", "לשם כך",
	"במקביל ל", "במידה ש", "במקום ש", "על יד", "בסמוך ל", "במרחק מה", "אל אשר", "מעבר ל", "כמו כן", "יתר על כן", "זאת ועוד",
	"נוסף על כך", "פרט ל", "למעלה מכך", "פנים נוספות לעניין", "יתרה מכך", "אך ורק", "מעבר לכך", "זאת אומרת", "במילים אחרות",
	"רוצה לומר", "הווה אומר", "משתמע מזאת", "הוא אשר", "ללמד ש", "פירושו של דבר", "לשון אחרת", "בהקשר זה", "דרך אגב", "כדי ש",
	"כנזכר לעיל", "בקשר לכך", "במסגרת זו", "עד ש", "בשעה ש", "כל זמן ש", "לפי שעה", "בזמן האחרון", "עד כה", "בו בזמן", "כל אימת ש",
	"על מנת", "לתכלית זו", "במטרה ל" ];

/**
 * Returns lists with transition words to be used by the assessments.
 * @returns {Object} The object with transition word lists.
 */
export default function() {
	return {
		singleWords: singleWords,
		multipleWords: multipleWords,
		allWords: singleWords.concat( multipleWords ),
	};
}
