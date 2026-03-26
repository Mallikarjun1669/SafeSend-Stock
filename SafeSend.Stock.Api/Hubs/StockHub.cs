using Microsoft.AspNetCore.SignalR;

public class StockHub : Hub
{
    public async Task SendStockUpdate(string stockName, decimal price)
    {
        await Clients.All.SendAsync("ReceiveStockUpdate", stockName, price);
    }
}