public class SuperTurtle extends Turtle
{
    //Draws an H with a circle around it. 
    public void circleH()
    {
          paint (90, 12);    // draw the left side of the H
          move (-180, 6);
          paint (90, 6);     // draw the crossbar of the H
          move (90, -6);
          paint (0, 12);     // draw the right side of the H
          move (150, 6);
          swingAround (9);   // draw a circle enclosing the H
    }
    
    
    
}