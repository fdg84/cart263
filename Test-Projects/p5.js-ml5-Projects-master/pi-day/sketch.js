/* Original by Daniel Shiffman.
 *
 * Choo Choo All Aboard!
 *
 * I modified Dan's code to implement faster searching algorithms to search digits of pi.
 *
 * Dan's original solution is the naive solution and runs in O(n) time complexity. While it is relatively fast with the
 * first million digits of pi, we can do better! And as you'll see with the optimizations, we can search even faster and
 * efficiently with the first BILLION digits of pi. That is just insanity.
 *
 * I initially thought that I could just implement binary search on the whole text file resulting in O(log n) time
 * complexity. But I was forgetting one key thing, which is that the array or string that you are searching must be
 * ordered. So the algorithm doesn't work.
 *
 * So, I decided to use dynamic programming and memoization to improve the speed. I decided to cache all the indices
 * into an array. And all the succeeding digits that you type would perform searches based on the memoized indices.
 * (Ex. you type '1', so the result is 1, but you have lots of 1s in pi). Now, there are LOTS of single digit matching
 * patterns in pi. Say that pi has an uniform distribution of the digits 0-9, meaning that statistically, each digit
 * shows up around 100,000 times (one tenth of one million). That leads us to an array with a length of 100,000. So to
 * reduce the memory and make JavaScript happy, we can limit the array length, to let's say 1,000.
 *
 * I also went overboard and tried this with 1 BILLION DIGITS OF PI!!! Note that the actual .txt file is 1GB... So I'm
 * grabbing the link instead: https://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt
 *
 * also you cna see the time differences
 *
 *
 *
 *
 *
 * ***********************************************
 * I have charted hte time averages here in the read me
 *
 *
 *
 * KMP algorithm
 * **************************************************
 *
 *
 *
 *
 * Big thanks to Daniel Shiffman and Processing foundation for the inspiration and this crazy journey with string
 * pattern search algorithms.
 * And Happy Pi Day!!! :)
 */


// Pi Day Digit Search
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/156-pi-digits.html
// https://youtu.be/
// https://editor.p5js.org/codingtrain/sketches/U649qYR4

let raw;
let digits, searchBox;
let indexP;

function preload() {
    raw = loadStrings('pi-million.txt');
}

//Naive O(n) search
function indexOf(txt, search) {
    let start = search.charAt(0);
    for (let i = 0; i < txt.length; i++) {
        if (txt.charAt(i) === start) {
            let found = true;
            for (let j = 1; j < search.length; j++) {
                if (txt.charAt(i + j) !== search.charAt(j)) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return i;
            }
        }
    }
    return -1;
}

//With memoization
function indexOfMemo(txt, search) {
    let start = search.charAt(0);
    for (let i = 0; i < txt.length; i++) {
        if (txt.charAt(i) === start) {
            let found = true;
            for (let j = 1; j < search.length; j++) {
                if (txt.charAt(i + j) !== search.charAt(j)) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return i;
            }
        }
    }
    return -1;
}

function searchItUp() {
    let search = searchBox.value();
    console.log(search);

    let index = indexOf(digits, search);

    if (index > 0) {
        indexP.html(index - 1);
    } else {
        indexP.html('Not Found in the First 1 Million Digits of Pi');
    }
}

function setup() {
    noCanvas();
    digits = raw[0];
    searchBox = createInput('');
    searchBox.input(searchItUp);
    indexP = createP('Searching...');
}