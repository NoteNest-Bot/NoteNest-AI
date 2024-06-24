import discord
from discord.ext import commands
from datetime import datetime, timedelta
from helpers.gemini import get_gemini_response

class Communication(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.conversation_histories = {}
        self.last_interaction_times = {}
        self.clear_history.start()

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return

        if self.bot.user.mentioned_in(message) and not message.mention_everyone:
            await self.handle_mention(message)

    async def handle_mention(self, message):
        user_id = message.author.id
        mention_content = message.content.replace(f"<@!{self.bot.user.id}>", "").strip()

        if not mention_content:
            mention_content = "Hello, how can I assist you today?"

        if user_id not in self.conversation_histories:
            self.conversation_histories[user_id] = []

        self.conversation_histories[user_id].append({"role": "user", "content": mention_content})
        self.last_interaction_times[user_id] = datetime.now()

        async with message.channel.typing():
            try:
                response = get_gemini_response(self.conversation_histories[user_id])
                if response:
                    self.conversation_histories[user_id].append({"role": "assistant", "content": response})
                    await message.reply(response)
                else:
                    await message.reply("Sorry, I couldn't answer you right now.")
            except Exception as e:
                await message.reply("An error occurred while processing your request.")
    
    @commands.Cog.listener()
    async def clear_history(self):
        now = datetime.now()
        to_remove = [user_id for user_id, last_interaction in self.last_interaction_times.items() if now - last_interaction > timedelta(hours=5)]
        for user_id in to_remove:
            del self.conversation_histories[user_id]
            del self.last_interaction_times[user_id]

async def setup(bot: commands.Bot):
    await bot.add_cog(Communication(bot))
