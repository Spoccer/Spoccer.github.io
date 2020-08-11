public class ProgramOne
{
     // Draw an uppercase letter 'H', 12 pixels tall and 6 wide.
     // Put a circle around the outside of the 'H'.

     public static void main (String[ ] args)  
     {    Turtle sam;            // create the variable named sam
          sam = new Turtle();    // create the object sam refers to

          sam.paint (90, 12);    // draw the left side of the H
          sam.move (-180, 6);
          sam.paint (90, 6);     // draw the crossbar of the H
          sam.move (90, -6);
          sam.paint (0, 12);     // draw the right side of the H
          sam.move (150, 6);
          sam.swingAround (9);   // draw a circle enclosing the H
     }  // this right-brace marks the end of the main method
}  // this right-brace marks the end of the class