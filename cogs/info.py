import discord
from discord.ext import commands

class Info(commands.Cog):
    def __init__(self, bot: commands.Bot) -> None:
        self.bot = bot

    @commands.command(name="info")
    async def info(self, ctx: commands.Context) -> None:
        embed = discord.Embed(
            title="Bot Information",
            description="Here is some information about the bot.",
            color=discord.Color.blue()
        )

        await ctx.send(embed=embed)

async def setup(bot: commands.Bot) -> None:
    await bot.add_cog(Info(bot))
