#include<stdio.h>
int main()
{
    int i,j;
    printf("\1\1\n"); /*输出两个笑脸*/
    for(i=1;i<11;i++)
    {
        for(j=1;j<=i;j++)
            printf("%c%c",219,219);
        printf("\n");
    }
    return 0;
}
